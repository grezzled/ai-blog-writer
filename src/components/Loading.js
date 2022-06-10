import { React} from "react";

function showLoading() {
    document.getElementById('loader').style.visibility = 'visible'
}
function hideLoading() {
    document.getElementById('loader').style.visibility = "hidden"
}

const Loading = () => {
    return (
        <div>
            <div id="loader" className="loader-div">
                <span className="loader">
                    <span></span>
                    <span></span>
                </span>
            </div>
        </div>
    )
}


export { Loading, showLoading, hideLoading } 