import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ButtonCopy extends React.Component {
    render() {
        let id = uuidv4();
        const notify = () => toast.success("Text Copied: \n\n\n" + this.props.value, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return (
            <button type="button" id={id} className="btn btn-light" onClick={(e) => {
                navigator.clipboard.writeText(this.props.value)
                notify()
            }}>
                <span className="material-symbols-outlined">content_copy</span>
            </button>
        )
    }
}