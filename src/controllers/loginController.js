const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const createUser = async (name, email, password) => {
	const encryptedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name: name,
			email: email.toLowerCase(),
			password: encryptedPassword
		}
	});

	return user; // Retorna o usuário criado, se necessário
};

const updateUser = async (id, name, email, password) => {
	try {
		const data = { name, email };

		if (password) {
			const encryptedPassword = await bcrypt.hash(password, 10);
			data.password = encryptedPassword; // Adiciona a senha se fornecida
		}

		const user = await prisma.user.update({
			where: { id: Number(id) }, // Converta para número se necessário
			data
		});

		return user; // Retorna o usuário atualizado, se necessário
	} catch (error) {
		console.log(error.message);
		throw error; // Lança o erro para que seja tratado em outro lugar, se necessário
	}
};

const verifyEmailUser = async (email, id) => {
	try {
		if (id) {
			const emailExist = await prisma.user.findUnique({
				where: { id: Number(id) } // Converta para número se necessário
			});

			if (emailExist && emailExist.email === email) return false; // Se o email for igual ao do usuário
		}

		const emailExist = await prisma.user.findUnique({
			where: { email: email.toLowerCase() }
		});

		return emailExist !== null; // Retorna true se o email existir, caso contrário false
	} catch (error) {
		console.log(error.message);
		throw error; // Lança o erro para que seja tratado em outro lugar, se necessário
	}
};

module.exports = { createUser, verifyEmailUser, updateUser };
