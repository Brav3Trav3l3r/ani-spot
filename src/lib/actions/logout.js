export function logOut(node){

    const handleClick = (event) => {
        if (node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent("actionClick"));
		}
    }

   document.addEventListener( 'click', handleClick)

   return {
    destroy() {
        document.removeEventListener("click", handleClick, true);
    },

}}