class CaixaDaLanchonete {
  constructor() {
    this.precoDosItens = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    }
  }

  validarItensExtras(itens) {
    const principaisRequeridos = ["cafe", "sanduiche"]
    const extrasRequeridos = {
      chantily: "cafe",
      queijo: "sanduiche",
    }

    const principaisEncontrados = []

    for (const item of itens) {
      const [itemName, itemQuantity] = item.split(",")

      if (!this.precoDosItens.hasOwnProperty(itemName)) {
        return "Item inválido!"
      }

      if (itemQuantity < 1) {
        return "Quantidade inválida!"
      }

      if (principaisRequeridos.includes(itemName)) {
        principaisEncontrados.push(itemName)
      }
    }

    for (const item of itens) {
      const [itemName] = item.split(",")
      if (
        extrasRequeridos[itemName] &&
        !principaisEncontrados.includes(extrasRequeridos[itemName])
      ) {
        return "Item extra não pode ser pedido sem o principal"
      }
    }

    return null
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (
      metodoDePagamento !== "dinheiro" &&
      metodoDePagamento !== "debito" &&
      metodoDePagamento !== "credito"
    ) {
      return "Forma de pagamento inválida!"
    }

    if (!itens || itens.length === 0) {
      return "Não há itens no carrinho de compra!"
    }

    const validacaoItensExtras = this.validarItensExtras(itens)
    if (validacaoItensExtras) {
      return validacaoItensExtras
    }

    const valorTotal = this.calcularValorTotalDosItens(itens)
    const valorComDesconto = this.aplicarDesconto(valorTotal, metodoDePagamento)
    const valorFormatado = valorComDesconto.toFixed(2).replace(".", ",")

    return "R$ " + valorFormatado
  }

  calcularValorTotalDosItens(itens) {
    let valorTotal = 0

    for (const item of itens) {
      const itemInfo = item.split(",")
      const itemName = itemInfo[0]
      const itemQuantity = parseInt(itemInfo[1])

      if (this.precoDosItens.hasOwnProperty(itemName)) {
        valorTotal += this.precoDosItens[itemName] * itemQuantity
      } else {
        return "Item inválido!"
      }
    }

    return valorTotal
  }

  aplicarDesconto(valorTotal, metodoDePagamento) {
    if (metodoDePagamento === "credito") {
      return valorTotal * 1.03
    } else if (metodoDePagamento === "dinheiro") {
      return valorTotal * 0.95
    } else {
      return valorTotal
    }
  }
}

export { CaixaDaLanchonete }
