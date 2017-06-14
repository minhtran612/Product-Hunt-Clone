import express from 'express';
import commonValidations from '../shared/validation/signup';
import bcrypt from 'bcrypt';
import _isEmpty from 'lodash/isEmpty';
import User from '../models/users';

let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);

    return User.query({
        where: { email: data.email },
        orWhere: { username: data.username }
        })
        .fetch()
        .then(user => {
            if (user) {
                if (user.get('username') === data.username) {
                    errors.username = 'There is user with such username';
                }
                if (user.get('email') === data.email) {
                    errors.email = 'There is user with such email';
                }
            }
            return {
                errors,
                isValid: _isEmpty(errors)
            };
        });
}
router.post('/', (req, res) => {
    const data = req.body.user;
    validateInput(data, commonValidations).then(({ errors, isValid }) => {
        if(isValid){
            const { username, password, email } = data;
            const password_digest = bcrypt.hashSync(password, 5);

            User.forge({username, email, password_digest}, { hasTimestamps: true })
                .save()
                .then(user => res.json({ success: true }))
                .catch(err => res.status(500).json({ errors: err }));
        }
        else{
            res.status(404).json(errors);
        }
    });
});

router.get('/:identifier', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
});

export default router;