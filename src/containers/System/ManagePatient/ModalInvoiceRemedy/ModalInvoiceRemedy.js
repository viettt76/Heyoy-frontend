import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'antd';
import { convertBase64 } from '~/utils';
import { FormattedMessage } from 'react-intl';

function ModalInvoiceRemedy({
    show,
    previewImage,
    patientEmail,
    setPatientEmail,
    setImage,
    setPreviewImage,
    sendInvoiceRemedy,
    handleClose,
}) {
    const handleSetFile = async (e) => {
        if (e.target.files[0]) {
            let imgBase64 = await convertBase64(e.target.files[0]);
            setImage(imgBase64);
            let img = URL.createObjectURL(e.target.files[0]);
            setPreviewImage(img);
        } else {
            setPreviewImage('');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="system.manage-patient.send-invoices/prescriptions" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className=" col-6">
                            <label>Email</label>
                            <input
                                className="form-control"
                                value={patientEmail}
                                onChange={(e) => setPatientEmail(e.target.value)}
                            />
                        </div>
                        <div className=" col-6">
                            <label>
                                <FormattedMessage id="system.manage-patient.invoices/prescriptions" />
                            </label>
                            <input className="form-control" type="file" onChange={(e) => handleSetFile(e)} />
                            {previewImage && (
                                <>
                                    <Image
                                        src={previewImage}
                                        width={100}
                                        height={100}
                                        style={{ marginTop: '10px', position: 'relative', left: '25%' }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendInvoiceRemedy}>
                        Gửi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInvoiceRemedy;
