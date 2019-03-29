<script>
    import { Loading } from 'element-ui';
    var unique;
    export default {
      name: "loading",
      show() {
        let opt = {target:document.querySelector(".page-wrap"), lock:true,background:'#fff',text: 'Loading...'};
        if(!unique) unique = Loading.service(opt);
      },
      resolve(resolve) {
        return function (component) {
          if (unique) {
            unique.close();
            unique = null;
          }
          resolve(component)
        }
      }
    }
</script>
