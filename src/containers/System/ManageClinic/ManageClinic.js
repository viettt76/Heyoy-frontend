import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import styles from './ManageClinic.module.scss';
import { LANGUAGES, convertBase64 } from '~/utils';
import { createClinicService } from '~/services';
import { useSelector } from 'react-redux';
import { languageSelector } from '~/store/selectors';

let mdParser = new MarkdownIt();

const ManageClinic = () => {
    const language = useSelector(languageSelector);

    const [previewImage, setPreviewImage] = useState(undefined);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [descriptionMarkdown, setDescriptionMarkdown] = useState('');

    const handleChangeMarkdown = ({ html, text }) => {
        setDescriptionHTML(html);
        setDescriptionMarkdown(text);
    };

    const handleSubmit = async () => {
        if (!previewImage) {
            setPreviewImage(undefined);
            toast.error(`Ảnh không hợp lệ!`);
            return;
        }
        let image = await convertBase64(previewImage);

        let res = await createClinicService({
            image,
            name,
            address,
            descriptionHTML,
            descriptionMarkdown,
        });

        if (res?.errCode === 0) {
            setPreviewImage(undefined);
            setName('');
            setAddress('');
            setDescriptionHTML('');
            setDescriptionMarkdown('');
            toast.success(language === LANGUAGES.VI ? 'Tạo phòng khám thành công!' : 'Create a successful clinic!');
        } else {
            toast.error(
                res?.message
                    ? res?.message
                    : language === LANGUAGES.VI
                    ? 'Tạo phòng khám thất bại!'
                    : 'Creating a failed clinic!',
            );
        }
    };

    return (
        <div className={clsx(styles['wrapper'])}>
            <div>
                <div className={clsx(styles['heading'])}>
                    <FormattedMessage id="system.manage-clinic.manage-clinic" />
                </div>
                <div className={clsx(styles['wrapper-row'])}>
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="system.manage-clinic.clinic-name" />
                        </label>
                        <input
                            value={name}
                            className={clsx(styles['input'])}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="col-6">
                        <label className={clsx('btn btn-primary', styles['btn-choose-file'])} htmlFor="chooseImage">
                            <FormattedMessage id="system.manage-clinic.clinic-image" />
                        </label>
                        <input
                            type="file"
                            hidden
                            className="form-control-file"
                            id="chooseImage"
                            onChange={(e) => setPreviewImage(e.target.files[0])}
                        />
                        {previewImage && (
                            <img
                                style={{ width: '112px', height: '112px', objectFit: 'contain' }}
                                src={URL.createObjectURL(previewImage)}
                                alt=""
                            />
                        )}
                    </div>
                </div>

                <div className={clsx('mt-3', styles['wrapper-row'])}>
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="system.manage-clinic.clinic-address" />
                        </label>
                        <input
                            className={clsx(styles['input'])}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div>
                    <label style={{ marginTop: '20px' }}>
                        <FormattedMessage id="system.manage-clinic.clinic-description" />
                    </label>
                    <MdEditor
                        style={{ height: '500px' }}
                        value={descriptionMarkdown}
                        onChange={handleChangeMarkdown}
                        renderHTML={(text) => mdParser.render(text)}
                    />
                </div>

                <button onClick={handleSubmit} className={clsx('btn btn-primary', styles['btn-save'])}>
                    <FormattedMessage id="system.manage-clinic.save" />
                </button>
            </div>
        </div>
    );
};

export default ManageClinic;
