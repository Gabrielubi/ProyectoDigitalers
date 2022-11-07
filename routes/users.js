const router = require("express").Router();
const User = require("../models/user");

//Register
router.get("/register", (req, res) => {
    res.render('users/register', {user: new User()})
});

  //Crear usuario
router.post('/', async(req, res, next)=>{
  req.user = new User()
  next()
},saveUserAndRedirect('new'))

  //Guardar usuario y redireccionar
function saveUserAndRedirect(){
  return async(req, res)=>{
      let user = req.user
      user.username = req.body.username
      user.email = req.body.email
      user.password = req.body.password
      try{
          user = await user.save()
          res.render('users/success')
      }catch (e){
        res.status(500).json(e);
      }
  }
}

//Renderizado de los usuarios de la DB

router.get("/all", async (req, res) => {
  const users = await User.find().sort({
      username: "desc"
  });
  res.render('users/list', {users: users})
})

//Eliminar usuario x username
router.delete('/:username', async(req, res)=>{
  await User.findOneAndDelete({username: req.params.username})
  res.redirect('/user/all')
})

//Editar usuario

router.get('/edit/:username', async(req, res)=>{
  const user = await User.findOne({username: req.params.username})
  res.render('users/edit', {user: user})
})

//LOGIN - to do - 

router.get("/login", (req, res) => {
  res.render('users/login')
});


module.exports = router;