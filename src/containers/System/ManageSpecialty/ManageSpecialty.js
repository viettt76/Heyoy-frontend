import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './ManageSpecialty.module.scss';
import { LANGUAGES, convertBase64 } from '~/utils';
import { createSpecialtyService } from '~/services/specialtyService';
import { languageSelector } from '~/store/selectors';

let mdParser = new MarkdownIt();

const ManageSpecialty = () => {
    const language = useSelector(languageSelector);

    const [previewImage, setPreviewImage] = useState(undefined);
    const [name, setName] = useState('');

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

        let res = await createSpecialtyService({
            image,
            name,
            descriptionHTML,
            descriptionMarkdown,
        });
        if (res?.errCode === 0) {
            setPreviewImage(undefined);
            setName('');
            setDescriptionHTML('');
            setDescriptionMarkdown('');
            toast.success(language === LANGUAGES.VI ? 'Tạo chuyên khoa thành công!' : 'Create a successful specialty!');
        } else {
            toast.error(
                res?.message
                    ? res?.message
                    : language === LANGUAGES.VI
                    ? 'Tạo chuyên khoa thất bại!'
                    : 'Creating a specialty failed!',
            );
        }
    };

    return (
        <div className={clsx(styles['wrapper'])}>
            <div>
                <div className={clsx(styles['heading'])}>
                    <FormattedMessage id="system.manage-specialty.manage-specialty" />
                </div>
                <div className={clsx(styles['wrapper-name-image'])}>
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="system.manage-specialty.specialty-name" />
                        </label>
                        <input
                            value={name}
                            className={clsx(styles['input'])}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="col-6">
                        <label className={clsx('btn btn-primary', styles['btn-choose-file'])} htmlFor="chooseImage">
                            <FormattedMessage id="system.manage-specialty.specialty-image" />
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
                                style={{ width: '153px', height: '100px', objectFit: 'contain' }}
                                src={URL.createObjectURL(previewImage)}
                                alt=""
                            />
                        )}
                    </div>
                </div>

                <div>
                    <label style={{ marginTop: '20px' }}>
                        <FormattedMessage id="system.manage-specialty.specialty-description" />
                    </label>
                    <MdEditor
                        style={{ height: '500px' }}
                        value={descriptionMarkdown}
                        onChange={handleChangeMarkdown}
                        renderHTML={(text) => mdParser.render(text)}
                    />
                </div>

                <button onClick={handleSubmit} className={clsx('btn btn-primary', styles['btn-save'])}>
                    <FormattedMessage id="system.manage-specialty.save" />
                </button>
            </div>
        </div>
    );
};

export default ManageSpecialty;
