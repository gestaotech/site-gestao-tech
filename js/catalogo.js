(function(){
  "use strict";
  var whatsapp = "5561998361296";
  var form = document.getElementById("lead-form");
  var product = document.getElementById("lead-product");
  var phone = document.getElementById("lead-phone");
  var error = document.getElementById("form-error");
  var year = document.getElementById("year");
  if(year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll("[data-product]").forEach(function(button){
    button.addEventListener("click",function(){
      if(product) product.value = button.getAttribute("data-product") || "";
      var target = document.getElementById("contato");
      if(target) target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
      window.setTimeout(function(){var name=document.getElementById("lead-name");if(name)name.focus();},250);
    });
  });

  if(phone){
    phone.addEventListener("input",function(){
      var digits=phone.value.replace(/\\D/g,"").slice(0,11);
      if(digits.length<=2) phone.value=digits;
      else if(digits.length<=6) phone.value="("+digits.slice(0,2)+") "+digits.slice(2);
      else if(digits.length<=10) phone.value="("+digits.slice(0,2)+") "+digits.slice(2,6)+"-"+digits.slice(6);
      else phone.value="("+digits.slice(0,2)+") "+digits.slice(2,7)+"-"+digits.slice(7);
    });
  }

  if(form){
    form.addEventListener("submit",function(event){
      event.preventDefault();
      var name=document.getElementById("lead-name").value.trim();
      var company=document.getElementById("lead-company").value.trim();
      var tel=document.getElementById("lead-phone").value.trim();
      var email=document.getElementById("lead-email").value.trim();
      var selected=product.value;
      var message=document.getElementById("lead-message").value.trim();
      var digits=tel.replace(/\\D/g,"");
      var emailInput=document.getElementById("lead-email");
      var emailValid=!email || (emailInput.checkValidity());
      if(name.length<2 || digits.length<10 || digits.length>11 || !selected || !emailValid){
        if(error){error.hidden=false;error.textContent="Confira nome, WhatsApp, e-mail e sistema de interesse antes de continuar.";}
        if(name.length<2) document.getElementById("lead-name").focus();
        else if(digits.length<10 || digits.length>11) phone.focus();
        else if(!emailValid) emailInput.focus();
        else product.focus();
        return;
      }
      if(error) error.hidden=true;
      var text="Olá, Gestão Tech! Tenho interesse em conhecer uma solução SaaS.\\n\\n";
      text+="Sistema: "+selected+"\\nNome: "+name+"\\n";
      if(company) text+="Empresa: "+company+"\\n";
      text+="WhatsApp: "+tel+"\\n";
      if(email) text+="E-mail: "+email+"\\n";
      if(message) text+="\\nMensagem: "+message;
      var url="https://wa.me/"+whatsapp+"?text="+encodeURIComponent(text);
      var opened=window.open(url,"_blank","noopener,noreferrer");
      if(!opened && error){error.hidden=false;error.textContent="O navegador bloqueou a abertura automática. Use o link de WhatsApp no início da seção de contato.";}
    });
  }

  var print=document.getElementById("print-catalog");
  if(print) print.addEventListener("click",function(){window.print();});
})();