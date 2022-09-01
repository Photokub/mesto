import Popup from "./Popup.js";


export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector)
        this._imageElement = this._popupSelector.querySelector('.popup__fullsize-img-picture')
        this._titleElement = this._popupSelector.querySelector('.popup__fullsize-img-caption')
    }
    open({name, link}) {
        super.open()
        this._titleElement.textContent = name;
        this._imageElement.src = link;
        this._titleElement = name;
    }
}