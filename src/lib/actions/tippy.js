import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';


export default function (node, options){
    const instance = tippy(node, options)

    return{
        destroy(){
            instance.destroy()
        }
    }
}

