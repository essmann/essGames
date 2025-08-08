function EditButton({onClick, text, icon=""}) {
    return (  
        <button className="edit_button" onClick={onClick}>

            <div className="edit_button_content">
                <span>{icon || ""}</span>
                <span>{text}</span>
            </div>

        </button>
    );
}

export default EditButton;