// ============================================
// CINEMAX - Backend Server
// Language: JavaScript (Node.js)
// Deploy this file on: render.com
// ============================================

const http = require('http');
const url  = require('url');

const PORT = process.env.PORT || 3000;

// ── Movie Data (your backend "database") ──
const movies = [
  { id:101, title:"Game Changer",         year:2025, rating:6.8, genre:["Action","Drama"],              duration:"2h 49m", category:"Tollywood",
    poster:"https://image.tmdb.org/t/p/w500/qtOGsZoLW7QceqKmsOy5nSM6Aik.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/aBw406SvghTKV6CTK9t84Bo9Xik.jpg",
    overview:"An honest IAS officer takes on the corrupt political system to bring change.",
    trailerUrl:"https://www.youtube.com/embed/zHiKFSBO_JE" },

  { id:102, title:"Pushpa 2: The Rule",   year:2024, rating:7.2, genre:["Action","Thriller","Drama"],   duration:"3h 20m", category:"Tollywood",
    poster:"https://image.tmdb.org/t/p/w500/t5ePZYRibJ0EEK1FK3GhihVkDW5.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/keC82cQ8q0ZHthrbvzWq04kGnbv.jpg",
    overview:"Pushpa Raj returns more powerful than ever as he rises in the smuggling syndicate.",
    trailerUrl:"https://www.youtube.com/embed/g3JUbgOHgdw" },

  { id:103, title:"Devara: Part 1",        year:2024, rating:6.5, genre:["Action","Adventure","Drama"],  duration:"2h 56m", category:"Tollywood",
    poster:"https://image.tmdb.org/t/p/w500/lQfuaXjANoTsdx5iS0gCXlK9D2L.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/hAQnXxOwCjgYcKRgTdYPRC8neqL.jpg",
    overview:"In a coastal village ruled by fear and smuggling, a legendary figure named Devara rises.",
    trailerUrl:"https://www.youtube.com/embed/yEffTqkDBdY" },

  { id:104, title:"Lucky Baskhar",         year:2024, rating:7.8, genre:["Crime","Drama","Thriller"],    duration:"2h 28m", category:"Tollywood",
    poster:"https://image.tmdb.org/t/p/w500/a47JQFl9L7VDa79tEvnTOJe0rPa.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/q8UyN4XhpmChtneZXdZ8fktQka6.jpg",
    overview:"A bank employee stumbles upon a financial loophole and transforms into a mastermind.",
    trailerUrl:"https://www.youtube.com/embed/FonKx5wvuHI" },

  { id:105, title:"KA",                    year:2024, rating:6.9, genre:["Action","Thriller"],           duration:"2h 29m", category:"Tollywood",
    poster:"https://image.tmdb.org/t/p/w500/4Gj7cWuKmWXu1CxwtrzclBlnlm8.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/ecz0o5V0GhmbjVSWzTJ1neEigQO.jpg",
    overview:"A postman discovers mysterious letters from the dead, unravelling dark secrets.",
    trailerUrl:"https://www.youtube.com/embed/n75xEs-9u1I" },

  { id:106, title:"Amaran",                year:2024, rating:8.2, genre:["War","Drama","Action"],        duration:"2h 49m", category:"Tollywood",
    poster:"https://image.tmdb.org/t/p/w500/yj9DbvPWjytH2EvDpGuJwos69rn.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/7cNE2qydew1c8fqnlhWjkE3DHc2.jpg",
    overview:"The inspiring true story of Major Mukund Varadarajan, who made the ultimate sacrifice.",
    trailerUrl:"https://www.youtube.com/embed/U3aPapvUihg" },

  { id:201, title:"Singham Again",         year:2024, rating:6.4, genre:["Action","Drama"],              duration:"2h 24m", category:"Bollywood",
    poster:"https://image.tmdb.org/t/p/w500/2JbNkHg8m7LaBy61LyrnnlenaxY.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/kQGJ3Cv7AKAvmdUaCLihkxVMMqs.jpg",
    overview:"DCP Bajirao Singham returns in an epic battle against evil, inspired by the Ramayana.",
    trailerUrl:"https://www.youtube.com/embed/DovbhJavvfU" },

  { id:202, title:"Bhool Bhulaiyaa 3",     year:2024, rating:5.8, genre:["Horror","Comedy"],             duration:"2h 38m", category:"Bollywood",
    poster:"https://image.tmdb.org/t/p/w500/3AfHD1HoaQpQwKH8kxRdBKVmzeU.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/1TdCtQaAqZhKRSOSbPi1EPToJxN.jpg",
    overview:"Rooh Baba returns to face a terrifying new haunting in a grand haveli.",
    trailerUrl:"https://www.youtube.com/embed/sp3Io6rcA8E" },

  { id:203, title:"Stree 2",               year:2024, rating:7.5, genre:["Horror","Comedy"],             duration:"2h 30m", category:"Bollywood",
    poster:"https://image.tmdb.org/t/p/w500/2NC7sj8rheKxWqLYAbHnCa4mYBH.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/fVV0A67kDjTTQ4CvUn8LoletRmI.jpg",
    overview:"The men of Chanderi face a new supernatural threat — Sarkata, a headless demon.",
    trailerUrl:"https://www.youtube.com/embed/OgNbVpkE6E4" },

  { id:204, title:"Jigra",                 year:2024, rating:5.5, genre:["Action","Drama","Thriller"],   duration:"2h 33m", category:"Bollywood",
    poster:"https://image.tmdb.org/t/p/w500/mhnT27mgtiMNowOhAlMWSqBoSyb.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/rxh0nZxZMZ7jogcCKcMpYZkoq1C.jpg",
    overview:"A fiercely protective sister goes to extraordinary lengths to rescue her brother.",
    trailerUrl:"https://www.youtube.com/embed/pLPHQaumq4g" },

  { id:205, title:"Vicky Vidya Ka Woh Wala Video", year:2024, rating:5.2, genre:["Comedy","Drama"],      duration:"2h 32m", category:"Bollywood",
    poster:"https://image.tmdb.org/t/p/w500/77gbFuFUfXx3OWv6pGhOAfHMBpg.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/efCflkxZPCHffIaZLuQhclVJcqM.jpg",
    overview:"Set in 1997, a newly married couple's intimate CD goes missing. A hilarious hunt begins.",
    trailerUrl:"https://www.youtube.com/embed/4liP09haI9g" },

  { id:206, title:"Sector 36",             year:2024, rating:7.6, genre:["Crime","Thriller","Drama"],    duration:"2h 4m",  category:"Bollywood",
    poster:"https://image.tmdb.org/t/p/w500/pbVcZmmcfqk35Q9hNxRoR7JPiVp.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/as8fZuf0c8V2iMO43kw13hc6a9V.jpg",
    overview:"A police inspector investigates disappearing children, uncovering a horrifying killer.",
    trailerUrl:"https://www.youtube.com/embed/ruEDbTaUItQ" },

  { id:301, title:"Kanguva",               year:2024, rating:5.5, genre:["Action","Fantasy","Adventure"],duration:"2h 54m", category:"Kollywood",
    poster:"https://image.tmdb.org/t/p/w500/lycbTFBXqFN1kMdPEsnAFutKEEy.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/cpK4ZqGZVJAIIKo8EgpSHif8yNL.jpg",
    overview:"A warrior from an ancient civilization is reborn in the modern world.",
    trailerUrl:"https://www.youtube.com/embed/ByCDEmNig7Q" },

  { id:302, title:"Vettaiyan",             year:2024, rating:5.8, genre:["Action","Crime","Drama"],      duration:"2h 41m", category:"Kollywood",
    poster:"https://image.tmdb.org/t/p/w500/yEEyhQaW7cEb0IDJstoMBmEtPND.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/b3AeMIsXPm6wvGp9E7mGmRZ6528.jpg",
    overview:"A fiery encounter specialist cop faces a moral dilemma when his methods are challenged.",
    trailerUrl:"https://www.youtube.com/embed/NQXE3iJCWNI" },

  { id:303, title:"The Greatest of All Time", year:2024, rating:5.7, genre:["Action","Sci-Fi","Thriller"],duration:"3h 0m", category:"Kollywood",
    poster:"https://image.tmdb.org/t/p/w500/kk9SmNt6QcP5thvSYELWvO0NWuC.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/wuHD3SiccbQvHUT1LE9o8j9dJlU.jpg",
    overview:"A retired anti-terrorism agent is pulled back into action when his past returns.",
    trailerUrl:"https://www.youtube.com/embed/B5GAjuSnNuQ" },

  { id:304, title:"Thangalaan",            year:2024, rating:7.4, genre:["Drama","History","Adventure"], duration:"2h 41m", category:"Kollywood",
    poster:"https://image.tmdb.org/t/p/w500/dAci50FwevkdWIUzQWpdz7kSKHe.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/sNOWphqcNsq7aKw1LSKcP672gwf.jpg",
    overview:"Set in 1850s Kolar Gold Fields, a tribal leader helps colonizers discover gold.",
    trailerUrl:"https://www.youtube.com/embed/9KUOQvF25NI" },

  { id:305, title:"Raayan",                year:2024, rating:7.0, genre:["Action","Crime","Drama"],      duration:"2h 23m", category:"Kollywood",
    poster:"https://image.tmdb.org/t/p/w500/dHMbqpG7vZk1iEJaEkCCyixFbos.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/1Us0a54s7aFDwDtIfRjlwvnLJQg.jpg",
    overview:"A peace-loving man is forced into the underworld to protect his siblings.",
    trailerUrl:"https://www.youtube.com/embed/qQJJWhh-XRo" },

  { id:306, title:"Maharaja",              year:2024, rating:8.0, genre:["Thriller","Drama","Crime"],    duration:"2h 21m", category:"Kollywood",
    poster:"https://image.tmdb.org/t/p/w500/s0m4TM1XRAftQStgKpw024RvkJo.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/if61bpqSXngkGoGNjMdHZt02wZS.jpg",
    overview:"A barber files a bizarre police complaint about a stolen dustbin, hiding a twisted revenge.",
    trailerUrl:"https://www.youtube.com/embed/Otcr-vRuaQs" },

  { id:401, title:"ARM",                   year:2024, rating:6.8, genre:["Action","Adventure","Drama"],  duration:"2h 27m", category:"Mollywood",
    poster:"https://image.tmdb.org/t/p/w500/OClpEeRlHK3DrFO7QtWXtpDIOK.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/4VMaNlyZg7HNCTwkAIdi39j8463.jpg",
    overview:"Spanning three timelines in Northern Kerala, three warriors protect a sacred artifact.",
    trailerUrl:"https://www.youtube.com/embed/nMLZUQrdV8g" },

  { id:402, title:"Kishkindha Kaandam",    year:2024, rating:7.9, genre:["Mystery","Thriller","Drama"],  duration:"2h 5m",  category:"Mollywood",
    poster:"https://image.tmdb.org/t/p/w500/rniBYHDRs6e8qMkPr4D4ZE5uMhF.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/sqv6AUWkVLS7s9rWxhiChIiSQdd.jpg",
    overview:"A retired forest officer's lost gun triggers mysterious events and buried secrets.",
    trailerUrl:"https://www.youtube.com/embed/6jR7lL-o7js" },

  { id:403, title:"Bramayugam",            year:2024, rating:7.8, genre:["Horror","Drama","History"],    duration:"2h 11m", category:"Mollywood",
    poster:"https://image.tmdb.org/t/p/w500/snQLwRrfQAl5YFKVefZq9Lbscki.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/3Y5pOfxMrG8SqbIcGhYy497eOXc.jpg",
    overview:"In 17th-century Kerala, a folk singer discovers a mansion owner wields dark powers.",
    trailerUrl:"https://www.youtube.com/embed/kMWFgkMCn2E" },

  { id:404, title:"Manjummel Boys",        year:2024, rating:8.4, genre:["Thriller","Adventure","Drama"],duration:"2h 16m", category:"Mollywood",
    poster:"https://image.tmdb.org/t/p/w500/bswrtewwthpsh6nABiqKevU4UBI.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/zGsHpuMN412VyzJZZnQeq4lMdjF.jpg",
    overview:"Based on a true story, friends face a nightmare when one falls into the Guna Caves.",
    trailerUrl:"https://www.youtube.com/embed/9uzfrur9SDU" },

  { id:405, title:"Aavesham",              year:2024, rating:7.3, genre:["Action","Comedy"],             duration:"2h 38m", category:"Mollywood",
    poster:"https://image.tmdb.org/t/p/w500/k5RWPaNjgRcNvGoawYaQHQwyctI.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/6WxEPaZGFWmQegUmseoGtlTKtQq.jpg",
    overview:"Three college freshmen hire a local gangster for protection from bullies. Chaos ensues.",
    trailerUrl:"https://www.youtube.com/embed/OsMqr3556F8" },

  { id:406, title:"Premalu",               year:2024, rating:7.6, genre:["Romance","Comedy"],            duration:"2h 35m", category:"Mollywood",
    poster:"https://image.tmdb.org/t/p/w500/uPpmBjY3znUqGY8kYwI5xvOrSc0.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/gDyLcjvmdAhmYqjCMwZ9PndnAVm.jpg",
    overview:"A carefree engineering student falls for a spirited girl, leading to hilarious misunderstandings.",
    trailerUrl:"https://www.youtube.com/embed/OnxChVgg6N8" },

  { id:501, title:"Dune: Part Two",        year:2024, rating:8.5, genre:["Sci-Fi","Adventure","Drama"],  duration:"2h 46m", category:"Hollywood",
    poster:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    overview:"Paul Atreides unites with the Fremen on a warpath of revenge against the conspirators.",
    trailerUrl:"https://www.youtube.com/embed/Way9Dexny3w" },

  { id:502, title:"Deadpool & Wolverine",  year:2024, rating:7.7, genre:["Action","Comedy","Sci-Fi"],    duration:"2h 8m",  category:"Hollywood",
    poster:"https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    overview:"Deadpool recruits a variant of Wolverine to save his universe from extinction.",
    trailerUrl:"https://www.youtube.com/embed/73_1biulkYk" },

  { id:503, title:"Gladiator II",          year:2024, rating:6.9, genre:["Action","Drama","History"],    duration:"2h 28m", category:"Hollywood",
    poster:"https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
    overview:"Lucius enters the Colosseum as a gladiator to challenge the corrupt emperors of Rome.",
    trailerUrl:"https://www.youtube.com/embed/4rgYUipGJNo" },

  { id:504, title:"Joker: Folie à Deux",   year:2024, rating:5.2, genre:["Drama","Crime"],               duration:"2h 18m", category:"Hollywood",
    poster:"https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/uGmkTrH4uiEBlbONmJegnlhMiHN.jpg",
    overview:"Arthur Fleck finds a new muse in Harley Quinn. Together they descend into shared madness.",
    trailerUrl:"https://www.youtube.com/embed/_OKAwz2MsJs" },

  { id:505, title:"Alien: Romulus",        year:2024, rating:7.3, genre:["Sci-Fi","Horror","Thriller"],  duration:"1h 59m", category:"Hollywood",
    poster:"https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/9SSEUrSqhljBMzRe4aBTh17wUjd.jpg",
    overview:"Young space colonists encounter the Xenomorph on an abandoned space station.",
    trailerUrl:"https://www.youtube.com/embed/x0XDEhP4MQs" },

  { id:506, title:"The Substance",         year:2024, rating:7.4, genre:["Horror","Sci-Fi","Drama"],     duration:"2h 20m", category:"Hollywood",
    poster:"https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
    backdrop:"https://image.tmdb.org/t/p/original/t98L9uphqBSNn2Mkvdm3xSFCQyi.jpg",
    overview:"A fading celebrity takes a drug that creates a younger version of herself.",
    trailerUrl:"https://www.youtube.com/embed/LNlrGo--Es4" },
];

const TOP10_IDS = [102, 201, 301, 501, 101, 202, 502, 104, 302, 401];

// ── In-memory watchlist (resets when server restarts — fine for college project) ──
let watchlist = [];

// ── CORS helper — allows your Netlify frontend to call this server ──
function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJSON(res, status, data) {
  setCORS(res);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// ── Read POST body ──
function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

// ── Main server ──
const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const method = req.method;

  console.log(`[${new Date().toLocaleTimeString()}]  ${method}  ${pathname}`);

  // Handle CORS preflight (browser sends this before every cross-origin request)
  if (method === 'OPTIONS') {
    setCORS(res);
    res.writeHead(204);
    res.end();
    return;
  }

  // ── GET /  →  health check ──
  if (pathname === '/' && method === 'GET') {
    sendJSON(res, 200, { status: 'CINEMAX backend is running!', routes: [
      'GET  /api/movies',
      'GET  /api/movies?category=Bollywood',
      'GET  /api/movies?genre=Action',
      'GET  /api/movies?search=pushpa',
      'GET  /api/movies/:id',
      'GET  /api/top10',
      'GET  /api/watchlist',
      'POST /api/watchlist   body: { movieId: 101 }',
      'DELETE /api/watchlist/:id',
    ]});
    return;
  }

  // ── GET /api/movies  →  all movies with optional filters ──
  if (pathname === '/api/movies' && method === 'GET') {
    let result = [...movies];
    if (query.category) result = result.filter(m => m.category.toLowerCase() === query.category.toLowerCase());
    if (query.genre)    result = result.filter(m => m.genre.map(g => g.toLowerCase()).includes(query.genre.toLowerCase()));
    if (query.search)   result = result.filter(m => m.title.toLowerCase().includes(query.search.toLowerCase()));
    sendJSON(res, 200, { success: true, count: result.length, movies: result });
    return;
  }

  // ── GET /api/movies/:id  →  single movie ──
  const movieMatch = pathname.match(/^\/api\/movies\/(\d+)$/);
  if (movieMatch && method === 'GET') {
    const movie = movies.find(m => m.id === parseInt(movieMatch[1]));
    if (movie) sendJSON(res, 200, { success: true, movie });
    else       sendJSON(res, 404, { success: false, message: 'Movie not found' });
    return;
  }

  // ── GET /api/top10 ──
  if (pathname === '/api/top10' && method === 'GET') {
    const top10 = TOP10_IDS.map(id => movies.find(m => m.id === id)).filter(Boolean);
    sendJSON(res, 200, { success: true, top10 });
    return;
  }

  // ── GET /api/watchlist ──
  if (pathname === '/api/watchlist' && method === 'GET') {
    const wl = movies.filter(m => watchlist.includes(m.id));
    sendJSON(res, 200, { success: true, count: wl.length, watchlist: wl });
    return;
  }

  // ── POST /api/watchlist  →  add movie ──
  if (pathname === '/api/watchlist' && method === 'POST') {
    const body = await readBody(req);
    const id = parseInt(body.movieId);
    if (!movies.find(m => m.id === id)) {
      sendJSON(res, 404, { success: false, message: 'Movie not found' });
      return;
    }
    if (!watchlist.includes(id)) watchlist.push(id);
    sendJSON(res, 200, { success: true, message: 'Added to watchlist', movieId: id });
    return;
  }

  // ── DELETE /api/watchlist/:id  →  remove movie ──
  const wlMatch = pathname.match(/^\/api\/watchlist\/(\d+)$/);
  if (wlMatch && method === 'DELETE') {
    const id = parseInt(wlMatch[1]);
    watchlist = watchlist.filter(x => x !== id);
    sendJSON(res, 200, { success: true, message: 'Removed from watchlist', movieId: id });
    return;
  }

  // ── 404 fallback ──
  sendJSON(res, 404, { success: false, message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ██████╗██╗███╗   ██╗███████╗███╗   ███╗ █████╗ ██╗  ██╗');
  console.log(' ██╔════╝██║████╗  ██║██╔════╝████╗ ████║██╔══██╗╚██╗██╔╝');
  console.log(' ██║     ██║██╔██╗ ██║█████╗  ██╔████╔██║███████║ ╚███╔╝ ');
  console.log(' ╚██████╗██║██║ ╚████║███████╗██║ ╚═╝ ██║██║  ██║  ██║   ');
  console.log('');
  console.log(`  Backend running on http://localhost:${PORT}`);
  console.log('  Backend Language: JavaScript (Node.js)');
  console.log('');
});
