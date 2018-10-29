const express = require('express');
let router = express.Router();

// middleware
function validateUser(req, res, next) {
    res.locals.validated = true;
    console.log("VALIDATED!")
    next();
};

// validateUser is middleware that WILL ONLY be added to this router.
// In other words, the main router doesn't know about it
router.use(validateUser);

router.get('/', (req, res, next) => {
    res.json({
        msg: "User Router works!"
    })
});

module.exports = router;