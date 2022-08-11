# Angular Mini E-commerce Libreria per Ragazzi

Una piccola App costruita utilizzando la versione 13 di uno dei miei Framework preferiti, Angular.

Mi sono innanzitutto premunita di realizzare un End-Point di Back-End per poter collegare l'App ad un database in MySql contenente una tabella di libri per ragazzi ed una di utenti.

Tramite del codice PHP ho dunque configurato delle REST API che ho agganciato ad Angular mediante i Services e che si occupano di scaricare e visualizzare mediante richiesta GET l'intera lista di libri e poi di effettuare il Login e la Registrazione di nuovi utenti su dei Reactive Forms tramite richieste POST. Per poter agganciare correttamente il Back-End con il Front-End ho adottato importanti concetti di Angular fra cui i Subjects, i BehaviourSubjects con operatori quali next() e first(), gli Observables. Inoltre ho configurato un carrello implementando un Service specifico con un metodo che si occupa dell'aggiunta di prodotti ma anche di due ulteriori metodi che entrano in gioco una volta che è stato posto nel carrello un libro; i metodi sono increment() e decrement() che consentono all'utente rispettivamente di aumentare e diminuire la quantità di libri all'interno del carrello.

L'App è in corso d'opera
