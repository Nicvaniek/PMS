function showResult(str) 
    {
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      } else {  // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange=function() {
        if (this.readyState==4 && this.status==200) {
          document.getElementById("livesearch").innerHTML=this.responseText;
        }
      }
      xmlhttp.open("GET","http://www.unhinged.co.za/Demo/Nic1/php/search.php?q="+str,true);
      xmlhttp.send();
    }