const FlashMessage = ({msg, alert}) => {
    return ( 
        <div className={'my-3 alert alert-'+alert}>
            {msg}
            <img src="/img/info-icon.png" alt="info" />
        </div>
    );
}
 
export default FlashMessage;