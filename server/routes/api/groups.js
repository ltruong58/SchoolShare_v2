const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Group = require("../../../models/Group");
const User = require('../../../models/User');

router.get('/test', (req, res) => res.json({ msg: 'in groups.js' }));
router.get('/testauth',passport.authenticate('jwt', { session: false }),
(req, res)=> res.json({
    msg: 'authorized'
}));

router.get('/', passport.authenticate('jwt', { session: false }),
	(req,res) =>{
		classIdList = req.body.classes;
		classList = Group.find('_id': {$in: classIdList});
		res.json({ msg: classList });
}),

pouter.post('/createGroup', passport.authenticate('jwt', { session: false }),
	(req,res) =>{
	User.findOne({ user: req.user.id }).then(user => {
		Group.findOne({inviteCode: req.body.inviteCode}).then(group => {
			if (group) {
				return res.status(400).json({ inviteCode: "Invite code is already used" });
			} else {
				const newGroup = new Group({
					creator: req.user.id,
					title: req.body.title,
					description: req.body.description,
					inviteCode: req.body.inviteCode
				});
				newGroup.save().then(grp => res.json(grp)).catch(err => console.log(err));
			}
		}
	}
});

module.exports = router;
