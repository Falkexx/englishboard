import { FirebaseUsersTypes } from '@/Utils/UserTypes'

type UserDetailProps = {
    dadosUser: FirebaseUsersTypes[];
};

const UserDetail: React.FC<UserDetailProps> = ({ dadosUser }) => {
    return (
        <section>
            {dadosUser.map((e) => {
                return (
                    <div key={e.id}>
                        <h1 className="text-red-700">Apelido</h1>
                        <h1>{e.Apelido}</h1>
                        <hr></hr>

                        {/*verificando se ele tem alguma conquista */}

                        <h1 className="text-red-700">Conquistas</h1>
                        {e.Conquistas.length > 0 ? e.Conquistas.map((e) => {
                            return (
                                <h1>{e}</h1>
                            )
                        }) : 'Não tem nenhuma conquista ainda'}

                        {/*/////////////////////// */}
                        <h1 className="text-red-700">Nome</h1>
                        <h1>{e.Nome}</h1>
                        <hr></hr>

                        <h1 className="text-red-700">Seu Email</h1>
                        <h1>{e.Email}</h1>
                        <hr></hr>

                        <h1 className="text-red-700">Total XP</h1>
                        <h1>{e.TotalXP}</h1>
                        <hr></hr>

                        <h1 className="text-red-700">Quando ingressou</h1>
                        <h1>{e.DataDeIngresso}</h1>
                        <hr></hr>

                        <h1 className="text-red-700">Medalha</h1>
                        <h1>{e.Medalha}</h1>
                        <hr></hr>

                        <h1 className="text-red-700">Seu avatar</h1>
                        <img src={e.AvatarURL} alt="avatar" />
                        <hr></hr>
                    </div>
                );
            })}
        </section >
    );
};

export default UserDetail;
