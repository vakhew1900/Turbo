async function href_with_authorization(link){

    let headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    
      const res = await fetch(link, {
        headers: headers
      })

      if(res.status == 403){
        window.location.href= '/redactor';
      }
      else {
        window.location.href = link;
      }
      
}


