# SocialTech

### **To do list**

- [x] Página de perfil
- [x] modal do post com comentários
- [x] Autenticação
- [x] Notificações
- [ ] Página do chat
- [ ] Loading

----
Sessão Requisições:

- [x] Ações do usuário:
Fazer e desfazer amizade, curtir e descurtir post

- [x] Post:
Criar, excluir, editar

- [x] Comentário:
criar e deletar comentário

- [x] Notificação:
Redirecionar para o post comentado ou curtido e redirecionar para o perfil do seguidor
OBS: abrir o post que foi curtido ou comentado

Sessão de notificação:

- [x] Exibir notificações do dia


---
Ideias

- trazer só os 30 primeiros posts
- Redux + Redux-persitor [estudar]
- Retornar os dados necessários para o persistor
- [ ] abstrair a lógica
- [ ] Componentizar o que der
- [x] editar status das notificações vistas
- [x] Mostar Navbar quando rolar o scroll para cima

Problemas encontrados:

- [x] foto modal
- [x] desabilitar os botoes do login e criar post, caso o usuário não forneça dados
- [x] remover o botão de desfazer amizade em perfil de outro usuário
- [x] verificar as funções da página de perfil
- [x] verificar a posição da notificação
- [ ] verificar o defocar aplicado ao reduzir a página modalpost

---------------------------------------------------------------------

- [ ]  tabela de conversa
Carregar as informações do amigo da conversa
Carregar as mensagens pelo id da conversa
Carrega a última mensagem da conversa


<!--

<div
  className={`flex flex-col justify-between ${
    picturePath ? 'w-[36%]' : 'w-full rounded-xl'
  } h-full overflow-hidden dark:bg-gray-700 bg-gray-100 rounded-r-2xl`}
>
  <div className="w-full pb-20 relative">
    <div className="bg-white dark:bg-gray-800 sticky top-0 w-full">
      <div className="w-full flex items-center gap-2 px-2 py-4">
        <UserImage
          image={post.userPicturePath}
          className="w-16 h-16 rounded-full"
          alt="user"
        />
        <h2 className=" text-gray-800 dark:text-gray-50">
          {post.firstName}
        </h2>
      </div>
      {description?.length > 200 ? (
        <div>
          <p className={`${viewMore ? 'h-auto' : 'h-[62px]'} px-2 text-gray-800 dark:text-gray-50`}>
            {description}
          </p>
          <div className="flex justify-end items-center">
            <div className="flex justify-end items-center pt-2 hover:text-sky-600 text-sky-400 cursor-pointer">
              <span
                onClick={() => setViewMore(!viewMore)}
                aria-hidden="true"
              >
                {!viewMore ? 'ver mais' : 'ver menos'}
              </span>
              {!viewMore ? <ChevronDown /> : <ChevronUp />}
            </div>
          </div>
        </div>
      ) : (
        <p className="px-2 text-gray-800 dark:text-gray-50">
          {description}
        </p>
      )}
      {/* actions */}
      <div className="flex justify-between gap-2 p-2 text-gray-200">
        {isLiked ? (
          <Heart
            className="cursor-pointer text-sky-500 fill-sky-500"
            onClick={handleRemoveLike}
          />
        ) : (
          <Heart
            className="cursor-pointer text-gray-600 dark:text-gray-200"
            onClick={handleLike}
          />
        )}
        <Share2 />
      </div>
    </div>

    <div
      className="w-full min-h-[100vh] flex flex-col bg-gray-50 dark:bg-gray-500"
    >
      <div className="min-h-screen px-2 text-gray-600 dark:text-gray-50 overflow-y-auto">
        {allComments.map(({
          id, friendId, comment, firstName, userPicturePath,
        }) => (
          <Comments
            key={id}
            id={id}
            friendId={friendId}
            firstName={firstName}
            postId={postId}
            getComments={getComments}
            image={`${
              import.meta.env.VITE_NODE_API_URL
            }/assets/${userPicturePath}`}
            text={comment}
          />
        ))}
      </div>
    </div>
  </div>

  <div className={`${post.picturePath ? 'absolute w-[36%]' : 'absolute w-full'} flex flex-col bottom-0`}>
    <div className="flex justify-between gap-2 items-center bg-white dark:bg-gray-800 px-2 rounded-br-xl">
      <UserImage
        size="14"
        image={user.picturePath}
        alt=""
      />
      <Textarea
        type="text"
        rounded="rounded-full"
        value={addCommnets}
        onKeyDown={handleKeyComment}
        onChange={(event) => setAddComments(event.target.value)}
        placeholder="What's on your mind..."
      >
        {addCommnets}
      </Textarea>
      <Send
        onClick={handleAddComments}
        className="w-8 h-8 cursor-pointer text-gray-500 dark:text-gray-50 hover:text-gray-800 hover:dark:text-gray-100 rotate-45 mr-2"
      />
    </div>
  </div>
</div>

-->
