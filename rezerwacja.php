<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Wydział Komunikacji, Transportu i Dróg Starostwa Powiatowego w Szamotułach</title>
    

    <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@0,300;0,700;1,300&family=Roboto:wght@300;400&display=swap" rel="stylesheet"> 

    <!-- refresh 
    <meta http-equiv="refresh" content="10" />-->
    <link rel="apple-touch-icon" sizes="57x57" href="fav/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="fav/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="fav/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="fav/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="fav/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="fav/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="fav/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="fav/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="fav/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="fav/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="fav/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="fav/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="fav/favicon-16x16.png">
<link rel="manifest" href="fav/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="fav/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">

    <!-- Bootstrap core CSS -->
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">


<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>


<!-- sys kolejkowy -->
<script src="js_kolejka/jquery.min.js" type="text/javascript"></script>
<script src="js_rezerwacja/qms-reservation-pl.js" type="text/javascript"></script>
  <script src="js_rezerwacja/qms-reservation.js" type="text/javascript"></script>
  <script src="js_rezerwacja/jquery-ui-datepicker.min.js"></script>
  <script src="js_rezerwacja/datepicker-pl.js"></script>
  
  <link href="qms-css/jquery-ui.structure-datepicker.css" rel="stylesheet" type="text/css">
  <link href="qms-css/jquery-ui-datepicker.css" rel="stylesheet" type="text/css">
  <link href="qms-css/jquery-ui-datepicker.theme.css" rel="stylesheet" type="text/css">

  <link href="qms-css/css.css" rel="stylesheet" type="text/css">
    
  </head>
  <body>
    <div class="fixed-top">
        <header class="topbar">
            <div class="container">
              <div class="row">
                <!-- social icon-->
                <div class="col-sm-12">
                  <ul class="social-network">
                    <li><a class="waves-effect waves-dark" href="https://www.facebook.com/Powiat.Szamotulski/"><i class="fab fa-facebook"></i></a></li>
                    <li><a class="waves-effect waves-dark" href="https://www.youtube.com/channel/UCeRLLWdeSB6js5UMQQoDmlA"><i class="fab fa-youtube"></i></a></li>
                    
                  </ul>
                </div>
      
              </div>
            </div>
        </header>
        <nav class="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
          <div class="container">
            <a class="navbar-brand kondensed" rel="nofollow" target="_blank" href="index.php" style="text-transform: uppercase;">| KD.POWIAT-SZAMOTULY.PL</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
      
              <ul class="navbar-nav ml-auto">
      
                <li class="nav-item">
                <a class="nav-link" href="kolejka.php">Stan kolejki
                    
                  </a>
                </li>
      
                <li class="nav-item active">
                  <a class="nav-link" href="rezerwacja.php">Rezerwacja online</a>
                  <span class="sr-only">(current)</span>
                </li>
      
               <li class="nav-item">
                  <a class="nav-link" href="esp.php">ESP</a>
                </li>
      
               
              </ul>
            </div>
          </div>
        </nav>
      </div>

<main role="main">

  <section class="jumbotron text-center">
    <div class="container">
      <h1>Rezerwacja</h1>
      <p class="lead text-muted">Rezerwacja terminu wizyty w Wydziale Komunikacji, Transportu i Dróg online.</p>
      
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">
    <div id='reservation-form-container'>


<div id="reservation-time-spinner" class="default-spinner reservation-time-spinner"></div>


</div>
    
  
</div>
         

  </div>
    </div>
  </div>

</main>
<footer class="container-fluid" style="margin-top:60px;">
    <div class="container">
        <div class="row">
            <div class="col-sm">
           
      <h4 class="mt-lg-0 mt-sm-4">Informacje</h4>
      <p>Starostwo Powiatowe, Wojska Polskiego 4, 64-500 Szamotuły</p>
      <p class="mb-0"><i class="fa fa-phone mr-3"></i>61-29-28-700</p>
      <p class="mb-0"><i class="fa fa-fax mr-3"></i>61-29-21-880</p>
      <p><i class="fas fa-envelope mr-3"></i><a href="mailto:starostwo@szamotuly.com.pl" class="linkwstopie">starostwo@szamotuly.com.pl</a></p>
    
  

            </div>
            <div class="col-sm">
            <h4 class="mt-lg-0 mt-sm-4">Telefony:</h4>
                <ul class="ulfooter">
                    <li>Dyrektor wydziału: 61-29-28-731</li>
                    <li>Dowody rejestracyjne: 61-29-28-734</li>
                    <li>Rejestracja pojazdów: 61-29-28-732/733/739</li>
                    <li>Transport, OSK, SKP: 61-29-28-735</li>
                    <li>Prawa jazdy: 61-29-28-736/738</li>
                </ul>
            </div>

            <div class="col-sm">
            <h4 class="mt-lg-0 mt-sm-4">Linki:</h4>
                <ul class="ulfooter">
                <li><a href="https://bip.powiat-szamotuly.pl/" class="linkwstopie">BIP</a></li>
                <li><a href="https://bip.powiat-szamotuly.pl/dokumenty/menu/40" class="linkwstopie">BIP - Wydział KD</a></li>
                <li><a href="http://rodo.powiat-szamotuly.pl/" class="linkwstopie">RODO</a></li>
                <li><a href="https://www.powiat-szamotuly.pl/" class="linkwstopie">Strona Powiatowa</a></li>
                </ul>
            </div>
        </div>
</footer>
<div class="footer-copyright copyright-gradient">
    <div class="container">
    <div class="row">
    <div class="col-md-12">
    <p>©2020. Wszelkie prawa zastrzeżone.</p>
    </div>
    </div>
    </div>
    </div>

<script src="js/bootstrap.bundle.js"></script>
<script>

var reservation = new QmsReservation('reservation-form-container');

//Platforma Biznesu
reservation.controllerUrl = "http://80.87.36.122:10779/index.php?option=com_ajax&plugin=reservationapi&format=raw&lang=pl";

reservation.language = 'pl';
reservation.init();

</script>


</body></body>
</html>