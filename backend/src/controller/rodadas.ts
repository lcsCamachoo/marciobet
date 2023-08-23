
import { Request, Response } from "express";
import { prisma } from "../../prisma/client";

export const listarJogosRodadaAtual = async (req: Request, res: Response) => {
  try {
    const rodada = await prisma.rodada.findFirst({
      where: {
        atual: true,
      },
      select: {
        id: true,
      }
    });
    if(!rodada) throw new Error("Rodada não encontrada");
    const jogos = await prisma.jogos.findMany({
      where: {
        rodadaId: String(rodada?.id),
      },
      include: {
        Rodada: true,
      }
    });
    res.status(200).send({
      message: "Jogos encontrados",
      jogos,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao buscar os jogos",
      error: true,
      success: false,
    });
  }
}

export const inserirJogos = async (req: Request, res: Response) => {
  try {
    const {
      times,
      rodadaId,
    } = req.body;
    const deleteJogos = await prisma.jogos.deleteMany({
      where: {
        rodadaId: String(rodadaId),
      }
    });
    const rodada = await prisma.rodada.update({
      where: {
        id: String(rodadaId),
      },
      data: {
        jogos: {
          createMany:{
              data:times
          }
        }
      },
    });

    res.status(200).send({
      message: "Rodada criada com sucesso",
      rodada,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Ocorreu um erro ao criar a rodada",
      error: true,
      success: false,
    });
  }
}

export const findAtual = async (req: Request, res: Response) => {
  try {
    const rodada = await prisma.rodada.findFirst({
      where: {
        atual: true,
      },
    });
    return res.status(200).send({
      message: "Rodada atual encontrada",
      rodada,
      error: false,
      success: true,
    });
  } catch (erro) {
    return res.status(400).send({
      message: "Ocorreu um erro ao buscar a rodada atual",
      error: true,
    });
  }
}

export const definirAtual = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;  
    const rodada = await prisma.rodada.update({
      where: {
        id: String(id),
      },
      data: {
        atual:true
      }
    });
    const others = await prisma.rodada.updateMany({
      where: {
        id: {
          not: String(id),
        },
      },
      data: {
        atual:false
      }
    });
    return res.status(200).send({
      message: "Rodada atualizada com sucesso",
    });
  } catch (erro) {
      return res.status(400).send({
        message: "Ocorreu um erro ao atualizar a rodada",
        error: true,
      })  
  }
}

export const atualizarJogos = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const {
      jogo1,
      jogo2,
      jogo3,
      jogo4,
      jogo5,
      jogo6,
      jogo7,
      jogo8,
      jogo9,
      jogo10,
    } = req.body;

    const rodada = await prisma.rodada.update({
      where: {
        id: String(id),
      },
      data: {
        jogo1,
        jogo2,
        jogo3,
        jogo4,
        jogo5,
        jogo6,
        jogo7,
        jogo8,
        jogo9,
        jogo10,
      },
    });

    res.status(200).send({
      message: "Rodada atualizada com sucesso",
      rodada,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Ocorreu um erro ao atualizar a rodada",
      error: true,
      success: false,
    });
  }
};

export const buscarUltimaRodada = async (
  req: Request,
  res: Response,
) => {
  try {
    const rodada = await prisma.rodada.findFirst({
      orderBy: {
        criado: "desc",
      },
      include: {
        respostas: true,
      },
    });

    res.status(200).send({
      message: "Listagem da ultima rodada",
      rodada,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao listar a ultima rodada",
      error: true,
      success: false,
    });
  }
};

export const listarPremioFinal = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const rodada = await prisma.rodada.findUnique({
      where: {
        id,
      },
      select: {
        premioFinal: true,
      },
    });

    res.status(200).send({
      message: "Listagem de PremioFinal",
      premioFinal: rodada?.premioFinal,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Ocorreu um erro ao listar os PremioFinal",
      error: true,
      success: false,
    });
  }
};

export const atualizarPremioFinal = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { premioFinal } = req.body;
  try {
    const premioFinalAtualizado = await prisma.rodada.update({
      where: {
        id,
      },
      data: {
        premioFinal,
      },
    });

    res.status(200).send({
      message: "PremioFinal atualizado com sucesso",
      data: premioFinalAtualizado,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Ocorreu um erro ao atualizar o PremioFinal",
      error: true,
      success: false,
    });
  }
};

export const inserir = async (req: Request, res: Response) => {
  try {
    const rodada = await prisma.rodada.create({
      data: {
        ...req.body,
      },
    });

    res.status(200).send({
      message: "Rodada inserida com sucesso",
      date: new Date(),
      rodada,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao inserir a rodada",
      error: true,
      success: false,
    });
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const rodadas = await prisma.rodada.findMany({
      orderBy: {
        criado: "asc",
      },
      include: {
        respostas: true,
        jogos: true,
      },
    });

    res.status(200).send({
      message: "Listagem de Rodadas",
      rodadas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao listar os Rodadas",
      error: true,
      success: false,
    });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      jogo1,
      jogo2,
      jogo3,
      jogo4,
      jogo5,
      jogo6,
      jogo7,
      jogo8,
      jogo9,
      jogo10,
    } = req.body;

    const rodadas = await prisma.rodada.update({
      where: {
        id: String(id),
      },
      data: {
        jogo1,
        jogo2,
        jogo3,
        jogo4,
        jogo5,
        jogo6,
        jogo7,
        jogo8,
        jogo9,
        jogo10,
      },
    });

    res.status(200).send({
      message: "Rodada atualizada com sucesso",
      rodadas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao atualizar a rodada",
      error: true,
      success: false,
    });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rodadas = await prisma.rodada.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).send({
      message: "Rodada deletada com sucesso",
      rodadas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao deletar a rodada",
      error: true,
      success: false,
    });
  }
};

export const buscar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rodada = await prisma.rodada.findUnique({
      where: {
        id: String(id),
      },
    });

    res.status(200).send({
      message: "Rodada encontrada",
      rodada,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao buscar a rodada",
      error: true,
      success: false,
    });
  }
};
