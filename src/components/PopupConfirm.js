import Popup from "./Popup.js";

export default class PopupConfirm extends Popup{
    constructor( popupselector, handleDeleteCard){
        super(popupselector);
        this._confirmBtn = popupselector.querySelector('.popup__confirm-delete-button')
        this._deleteCard = handleDeleteCard
    }

    open(id, card){
        super.open()
        this._cardId= id;
        this.card=card;
    }

    setEventListeners(){
        super.setEventListeners();
        this._confirmBtn.addEventListener('click', () => {
            this._deleteCard(this._cardId, this.card)
        })
    }
}