    const inputCorrente1 = document.getElementById("correnteA")
    const inputCorrente2 = document.getElementById("correnteB")
    const inputPotencia1 = document.getElementById("potenciaA")
    const inputPotencia2 = document.getElementById("potenciaB")
    const inputConsumo1 = document.getElementById("consumoA")
    const inputConsumo2 = document.getElementById("consumoB")
    const inputUmidade = document.getElementById("umidadeA")
    const inputTemperatura = document.getElementById("temperaturaA")
    const inputPresenca = document.getElementById("presencaSala")
    const buttonArduino = document.getElementById("retangulo")
    const luzUm = document.getElementById("circuloTomadaUm")
    const luzDois = document.getElementById("circuloTomadaDois")

    const firebaseConfig = {
        apiKey: "AIzaSyCSJjW8j-DtZawuTHAddXGawht0CTlNEzA",
        authDomain: "sa-iot-ca4a2.firebaseapp.com",
        databaseURL: "https://sa-iot-ca4a2-default-rtdb.firebaseio.com",
        projectId: "sa-iot-ca4a2",
        storageBucket: "sa-iot-ca4a2.appspot.com",
        messagingSenderId: "473913793172",
        appId: "1:473913793172:web:82d3040eb3fae6b42c3281"
    };

    // Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    interval = setInterval(() => {

        var statusTomada1 = document.getElementById("tomadaUm").checked;
        var statusTomada2 = document.getElementById("tomadaDois").checked;

        db.ref("sala_1/tomada_1/corrente/").get().then((v) => { inputCorrente1.innerText = Number(v.val()).toFixed(2) + "A"}); 
        db.ref("sala_1/tomada_2/corrente/").get().then((v) => { inputCorrente2.innerText = Number(v.val()).toFixed(2) + "A"});

        db.ref("sala_1/tomada_1/potencia_inst/").get().then((v) => { inputPotencia1.innerText = Number(v.val()).toFixed(2) + "W"}); 
        db.ref("sala_1/tomada_2/potencia_inst/").get().then((v) => { inputPotencia2.innerText = Number(v.val()).toFixed(2) + "W"}); 
        
        db.ref("sala_1/tomada_1/potencia_cons/").get().then((v) => { inputConsumo1.innerText = Number(v.val()).toFixed(2) + "W"}); 
        db.ref("ala_1/tomada_2/potencia_cons/").get().then((v) => { inputConsumo2.innerText = Number(v.val()).toFixed(2) + "W"}); 

        db.ref("sala_1/tomada_1/status/").set(statusTomada1);
        db.ref("sala_1/tomada_2/status/").set(statusTomada2);

        db.ref("sala_1/umidade/").get().then((v) => { inputUmidade.innerText = Number(v.val()).toFixed(1) + "%"}); 
        db.ref("sala_1/temperatura/").get().then((v) => { inputTemperatura.innerText = Number(v.val()).toFixed(1) + "°C"});

        db.ref("sala_1/presenca/").get().then((v) => { 
            if(v.val())
            {
                inputPresenca.innerText = "SIM"
                inputPresenca.style.color = "green";
                buttonArduino.style.background = "green";
            }
            else
            {
                inputPresenca.innerText = "NÃO";
                inputPresenca.style.color = "red";
                buttonArduino.style.background = "red";
            } 
        });

        db.ref("sala_1/tomada_1/agendar").get().then((v) => { 
            if(v.val()){
                luzUm.style.background = "#58b958"
            }else{
                luzUm.style.background = "#add8e693"
            }
        });
        db.ref("sala_1/tomada_2/agendar").get().then((v) => { 
            if(v.val()){
                luzDois.style.background = "#58b958"
            }else{
                luzDois.style.background = "#add8e693"
            }
        });
           
    }, 1000)

    function clickButton() {
        var tomadaUmRadio = document.getElementById('tomadaUmRadio').checked;
        var tomadaDoisRadio = document.getElementById('tomadaDoisRadio').checked;
        
        if(tomadaUmRadio){
            var horaInicio = document.getElementById('timerLigar').value;
            var horaFim = document.getElementById('timerDesligar').value;
            db.ref("sala_1/tomada_1/agendar").set(tomadaUmRadio);
            db.ref("sala_1/tomada_1/hora_on").set(horaInicio);
            db.ref("sala_1/tomada_1/hora_off").set(horaFim);
            
            luzUm.style.background = "#58b958";
            AlertaAgendamento();
        }
        
        if(tomadaDoisRadio){
            var horaInicio = document.getElementById('timerLigar').value;
            var horaFim = document.getElementById('timerDesligar').value;
            db.ref("sala_1/tomada_2/agendar").set(tomadaDoisRadio);
            db.ref("sala_1/tomada_2/hora_on").set(horaInicio);
            db.ref("sala_1/tomada_2/hora_off").set(horaFim);
            
            luzDois.style.background = "#58b958";
            AlertaAgendamento();
        }
    }

    function AlertaAgendamento()
    {
        alert("Energia agendada com sucesso!");
    }