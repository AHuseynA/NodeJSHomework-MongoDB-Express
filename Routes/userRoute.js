const express = require('express');
const User = require('/models/User');

const router = express.Router();

router.get('/search/:searchTerm', async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: searchTerm, $options: 'i' } },
                { firstname: { $regex: searchTerm, $options: 'i' } },
                { lastname: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;