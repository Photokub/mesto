import Popup from "./Popup.js";

export default class PopupConfirm extends Popup{
    constructor( popupselector){
        super(popupselector);
        this._confirmBtn = popupselector.querySelector('.popup__confirm-delete-button')
        //this._deleteCard = handleDeleteCard
    }

    submitHandler(submitAction){
        this._handleSubmit = submitAction;
    }

    // open(id, card){
    //     super.open()
    //     this._cardId= id;
    //     this.card=card;
    // }

    close(){
        super.close()
    }

    // _confirmationViaEnterKey(evt) {
    //     if (evt.code === 'Enter') {
    //         this._deleteCard(this._cardId, this.card)
    //         this.close()
    //     }
    // }

    setEventListeners(){
        super.setEventListeners();
        this._confirmBtn.addEventListener('click', () => {
            this._handleSubmit()
            //this._deleteCard(this._cardId)
        })
    }
}