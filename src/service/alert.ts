import { type Ref, ref } from "vue";
import { Generate } from "cerceis-lib";

interface Alert{
    id: string,
    text: string,
    show: boolean,
    timeout: number,
    color: string,
}

export interface NewAlertOptions{
    text: string,
    timeout?: number,
    color?: string,
}

export const newAlert = (op: NewAlertOptions) => {
    const tmp: Alert = {
        id: Generate.objectId(),
        text: op.text,
        show: true,
        timeout: op.timeout ?? 3000,
        color: op.color ?? "primary",
    }
    alertList.value.push(tmp);
}

export const alertList: Ref<Alert[]> = ref([]);