const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ========== ROTAS GET ==========
router.get("/", (req, res) => {
    res.render("pages/index-adm");
});

router.get("/adm-cliente", (req, res) => {
    res.render("pages/adm-cliente");
});

router.get("/adm-cliente-novo", (req, res) => {
    res.render("pages/adm-cliente-novo");
});

router.get("/adm-cliente-edit", (req, res) => {
    res.render("pages/adm-cliente-edit");
});

router.get("/adm-cliente-list", (req, res) => {
    res.render("pages/adm-cliente-list");
});

router.get("/adm-cliente-del", (req, res) => {
    res.render("pages/adm-cliente-del");
});


router.post(
    "/adm-cliente-novo", [
        body("nome")
        .trim()
        .notEmpty()
        .withMessage("O nome é obrigatório")
        .isLength({ min: 3 })
        .withMessage("O nome deve ter pelo menos 3 caracteres"),

        body("cpf")
        .trim()
        .notEmpty()
        .withMessage("O CPF é obrigatório")
        .custom((cpf) => {
            const cpfLimpo = cpf.replace(/\D/g, "");
            if (cpfLimpo.length !== 11) {
                throw new Error("O CPF deve ter 11 números");
            }
            return true;
        }),

        body("email")
        .trim()
        .notEmpty()
        .withMessage("O e-mail é obrigatório")
        .isEmail()
        .withMessage("Digite um e-mail válido"),

        body("senha")
        .notEmpty()
        .withMessage("A senha é obrigatória")
        .isLength({ min: 8 })
        .withMessage("A senha deve ter pelo menos 8 caracteres"),

        body("nomeUser")
        .notEmpty()
        .withMessage("O nome de usuário é obrigatório")
        .isLength({ min: 7 })
        .withMessage("O usuário deve ter pelo menos 7 caracteres")
    ],
    (req, res) => {
        const erros = validationResult(req);

        if (!erros.isEmpty()) {

            return res.render("pages/adm-cliente-novo", {
                erros: erros.array()
            });
        }

        const { nome, cpf, email, senha, nomeUser } = req.body;

        console.log("Cadastro válido!");

        res.send(`
            Nome: ${nome}<br>
            CPF: ${cpf}<br>
            E-mail: ${email}<br>
            Usuário: ${nomeUser}<br>
            Senha: ${senha}
        `);
    }
);


module.exports = router;