const MongoDB = require("../utils/mongodb.util");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: "Thiếu dữ liệu" });
        }

        const db = MongoDB.client.db();

        // check trùng username
        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: "Username đã tồn tại" });
        }

        // insert trực tiếp password (không hash)
        await db.collection("users").insertOne({
            username,
            password
        });

        res.send({ message: "Đăng ký thành công" });

    } catch (error) {
        console.log("Lỗi register:", error);
        res.status(500).send({ message: "Lỗi server" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const db = MongoDB.client.db();

        const user = await db.collection("users").findOne({
            username,
            password
        });

        if (!user) {
            return res.status(401).send({ message: "Sai tài khoản" });
        }

        res.send({ message: "Đăng nhập thành công", user });

    } catch (error) {
        console.log("Lỗi login:", error);
        res.status(500).send({ message: "Lỗi server" });
    }
};