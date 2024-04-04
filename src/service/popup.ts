import { type Ref, ref } from "vue";
import { Generate } from "cerceis-lib";

export const popupList: Ref<Popup[]> = ref([]);

interface PopupConstructorOptions{
    title: string,
    text: string,
    color?: string,
    btnOk?: string,
    btnCancel?: string,
    singleBtn?: boolean,
    loader?: boolean,
}
export class Popup{
    private _id: string;

    public text: string;
    public title: string;
    public btnOk: string;
    public btnCancel: string;
    public singleBtn: boolean;
    public loader: boolean;
    public color: string;

    public display: boolean = true;
    private _resolveFunc: any;

    constructor(op: PopupConstructorOptions){
        const options = {
            color: "primary",
            btnOk: "OK",
            btnCancel: "Cancel",
            singleBtn: false,
            loader: false,
            ...op,
        }
        this._id = Generate.objectId();
        this.text = options.text;
        this.title = options.title;
        this.btnOk = options.btnOk;
        this.btnCancel = options.btnCancel;
        this.singleBtn = options.singleBtn;
        this.loader = options.loader;
        this.color = options.color;
    }

    public async prompt(): Promise<boolean>{
        return new Promise((resolve) => {
            popupList.value.push(this);
            this._resolveFunc = resolve;
        })
    }
    public ok(){this._promptEndHandler(true)}
    public cancel(){this._promptEndHandler(false)}
    private _promptEndHandler(state: boolean){
        if(!this._resolveFunc) return;
        this._resolveFunc(state);
        this.display = false;
        // Wait until transition effect to end;
        setTimeout(()=>{
            const targetIndex = popupList.value.findIndex(e => e._id === this._id);
            if(targetIndex >= 0){
                popupList.value.splice(targetIndex, 1);
            }
        }, 400)
    }
    
    public destory(){
        const targetIndex = popupList.value.findIndex(e => e._id === this._id);
        if(targetIndex >= 0){
            popupList.value.splice(targetIndex, 1);
        }
    }

}