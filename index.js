var koa = require('koa');
var route = require('koa-route');
var json = require('koa-json');
var route = require('koa-route');
var cors = require('koa-cors');
 
var app = koa();

var cats = [
  {
    id: '1',
    name: 'Manfred',
    age: 30,
    color: 'brown',
    votes: 10
  },
  {
    id: '2',
    name: 'Arnau',
    age: 31,
    color: 'black',
    votes: 20
  },
  {
    id: '3',
    name: 'David',
    age: 30,
    color: 'white',
    votes: 30
  }
];

app.use(cors());

app.use(json());

app.use(route.get('/cats', function *() {
  this.body = cats;
}));

app.use(route.post('/cats/:id/votes', function *(id, next) {
  const fakeLagTime = 0; // ms
  
  yield new Promise((resolve) => {
    setTimeout(() => {
      const idx = cats.findIndex(cat => cat.id === id);
      cats[idx].votes += 1;
      this.body = cats[idx];
      resolve();
    }, fakeLagTime);
  });
}));

app.listen(3000);