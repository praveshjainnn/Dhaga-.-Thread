var express = require('express');
var router = express.Router();
const supabase = require('../src/db/supabase');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/index.html', function (req, res) {
  res.render('index');
});

router.get('/index', function (req, res) {
  res.render('index');
});

// input
router.get('/input/:path?', function (req, res) {

  const path = req.params.path || 'index';
  res.render('input/' + path.replace('.html', ''));
});

// Learning
router.get('/Learning/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Learning/' + path.replace('.html', ''));
});

//overview
router.get('/overview/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('overview/' + path.replace('.html', ''));
});

//pages
router.get('/Pages/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Pages/' + path.replace('.html', ''));
});

//statistics

router.get('/Statistics/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Statistics/' + path.replace('.html', ''));
});

//services
router.get('/Services/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Services/' + path.replace('.html', ''));
});

//table
router.get('/table/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('table/' + path.replace('.html', ''));
});

//teacher
router.get("/teacher/:path?", function (req, res) {
  const path = req.params.path || "index";
  res.render("teacher/" + path.replace(".html", ""));
});

// Wollkart
router.get('/Woolkart/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Woolkart/' + path.replace('.html', ''));
});

router.get('/warehouse/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('warehouse/' + path.replace('.html', ''));
});


router.get('/app-notifications.html', function (req, res) {
  res.render('app-notifications');
});
router.get('/app-profile.html', function (req, res) {
  res.render('app-profile');
});

router.get("/farmer/:path?", function (req, res) {
  const path = req.params.path || "index";
  res.render("farmer/" + path.replace(".html", ""));
});

router.get("/seller/:path?", function (req, res) {
  const path = req.params.path || "index";
  res.render("seller/" + path.replace(".html", ""));
});

router.get("/transport/:path?", function (req, res) {
  const path = req.params.path || "index";
  res.render("transport/" + path.replace(".html", ""));
});

router.get("/service/:path?", function (req, res) {
  const path = req.params.path || "index";
  res.render("service/" + path.replace(".html", ""));
});

//user register and login
//register

// REGISTER
router.post('/pages/app-register', async (req, res) => {
  const { email, password, name, role } = req.body;
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;

      if (data && data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: data.user.id, 
            name: name || email.split('@')[0], 
            role: role || 'farmer', 
            progress: 0 
          }]);
        if (profileError) {
          console.error('Failed to create profile row in Supabase:', profileError.message);
        }
      }
      res.redirect('/pages/app-login.html');
    } catch (err) {
      console.error('Supabase registration error:', err.message);
      res.render('Pages/app-register', { error: err.message });
    }
  } else {
    res.redirect('/pages/app-login.html');
  }
});

// LOGIN
router.post('/pages/login', async (req, res) => {
  const { email, password, role: formRole } = req.body;
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;

      if (data && data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const userRole = (profile && profile.role) || formRole || 'farmer';
        const userName = (profile && profile.name) || email.split('@')[0];
        const userProgress = (profile && profile.progress) || 0;

        const sessionUser = {
          _id: data.user.id,
          name: userName,
          email: data.user.email,
          role: userRole,
          progress: userProgress,
          batches: []
        };

        res
          .cookie('token', data.session.access_token)
          .cookie('progress', userProgress)
          .cookie('userID', data.user.id)
          .cookie('role', userRole)
          .cookie('user', JSON.stringify(sessionUser))
          .redirect('/index.html');
      } else {
        throw new Error('User data empty');
      }
    } catch (err) {
      console.error('Supabase login error:', err.message);
      res.render('Pages/app-login', { error: err.message });
    }
  } else {
    const role = formRole || 'farmer';
    const demoUser = {
      _id: 'demo001',
      name: req.body.name || 'Demo User',
      email: email || 'demo@demo.com',
      role: role,
      progress: 0,
      batches: []
    };
    res
      .cookie('token', 'demo-token')
      .cookie('progress', 0)
      .cookie('userID', 'demo001')
      .cookie('role', role)
      .cookie('user', JSON.stringify(demoUser))
      .redirect('/index.html');
  }
});

// USERS - demo mode: return empty list
router.post("/pages/users", async (req, res) => {
  res.json([]);
});

module.exports = router;
