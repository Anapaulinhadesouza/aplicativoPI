// RECUPERAR O ID  DETALHE DO LOCALSTORAGE
var id = parseInt (localStorage.getItem('detalhe'));

// PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

if(item){
    //TEM O ITEM
    console.log('Produto encontrado: ',item);

    // ALIMENTAR COM OS VALORES DO ITEM
    $("#imagem-detalhe").attr('src' , item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + 'reviews');
    $("#descricao-detalhe").html(item.descricao);
    $("#preco-detalhe").html(item.preco .toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'}));
    $("#precopromo-detalhe").html(item.preco_promocional .toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'}));

   var tabeladetalhes= $("#tabdetalhes");

   item.detalhes.forEach(detalhe=>{
    var linha = `
    <tr>
        <td>${detalhe.caracteristica}</td>
        <td>${detalhe.detalhes}</td>
   </tr>
    `;
    tabeladetalhes.append(linha);

   });

}else{
    //NÃO TEM O ITEM
    console.log('Produto não encontrado');
} 

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// FUNÇÃO PARA ADICIONAR CARRINHO
function adicionarAoCarrinho(item, quantidade){
    var itemNoCarrinho = carrinho.find(c=> c.item.id === item.id);

    if(itemNoCarrinho) {
        //JA TEM O ITEM NO CARRINHO
        //ADICIONAR A QUANTIDADE
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;
    }else{
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional,

        })
    }

    // ATUALIZAR O LOCALSTORAGE DE CARRINHO
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

}

//CLICOU NO ADICIONAR CARRINHO
$(".add-cart").on('click', function(){
    //ADICIONAR AO CARRINHO
    adicionarAoCarrinho(item, 1);

   var  toastCenter = app.toast.create({
        text: `${item.nome} adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
      });

      toastCenter.open();

});

// teste//

