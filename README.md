App.js -> Ketika user ingin masuk ke /home -> akan masuk ke ProtectedRoute dulu, kemudian di cek ke auth.isAuthenticated() -> kalau hasil nya true, dia akan diteruskan ke /home, kalau hasil nya false -> akan di redirect kembali ke halaman "/" atau login page -> kemudian user login -> masuk ke LoginService.jsx -> Masuk ke handleUserLogin = async (username, password)  -> disitu ada try and catch -> ketika masuk ke await Axios.post ketika sukses login (respone code 200) dia akan masuk ke try -> yang kemudian akan dilanjutkan Save Cookies -> kemudian masuk ke auth.Login untuk merubah this.authenticated = true; -> Kemudian dialihkan ke this.props.history.push("/home"); -> kalau dia gagal login (respone code 400) -> dia akan masuk ke catch, dan akan memunculkan pesan username atau password salah -> Kembali ke App.js -> sekarang ketika user ingin mengakses /product sudah bisa dilakukan karena this.authenticated nya sudah menjadi true



kodingan pagination ada disini


https://github.com/gerins/React-Login-Cookies-Pagination/blob/master/src/component/Domains/Products/TablePaging.jsx

https://github.com/gerins/React-Login-Cookies-Pagination/blob/master/src/redux/domains/product/prodAction.js
 
