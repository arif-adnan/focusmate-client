import Swal from "sweetalert2";
import { UpdateStatusRequest } from "../APIRequest/APIRequest";

export function UpdateToDO(id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {New: 'New', Completed: 'Completed', Progress: 'Progress', Cancelled: 'Cancelled'},
        inputValue:status,
    }).then((result)=>{
        return UpdateStatusRequest(id, result.value).then((updateResult)=>{
            return updateResult;
        })
    })
}