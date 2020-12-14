// tombol pencarian yang didapat dari bootstrap
$('.search-button').on('click', function() {
   
 $.ajax({
        url: 'http://www.omdbapi.com/?apikey=fc1c7133&s=' + $('.input-keyword').val(),
        success: (result) => {
            // masukan kedalam variable anggal yang diambil hanya data hasil pencariannya saja
            const movies = result.Search;
    
            // variable let cards digunakan untuk menimpa data, sebagai wadah dari data yang akan diambil ari API 
            let cards = '';
            movies.forEach(m => {
                cards += showcards(m);
            });
            // dom selector dari jquery untuk menanmpung class dari html dan merubah isi html dengan menimpanya
            $('.movie-container').html(cards);
    
            // ketika tombol detail diklik
            $('.modal-detail-button').on('click', function() {
                // this disini dimaksud untuk elemen yang kita klik
                // console.log($(this).data('imdbid'));
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=fc1c7133&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = shwoMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    }, 
                    error: (e) => {
                        console.log(e.responseText);
                    }
                })
            })
    
        },
        error: (e) => {
            console.log(e.responseText);
        }
    })

})


function showcards(m) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
        </div>
    </div>
</div>`;
}

function shwoMovieDetail(m) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col -md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
                <li class="list-group-item"><strong>Actors :</strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot :</strong><br>${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}