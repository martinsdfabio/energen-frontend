import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { getAll, getById } from '../../../service/Service';
import { Produto } from '../../../models/Produto'

function ListaProdutos() {

  const [produtos, setProdutos] = useState<Produto[]>([])

  const { id } = useParams<{id: string}>();

  const [token, setToken] = useLocalStorage('token');

  const history = useNavigate();

  useEffect(() => {
    if(token === '') {
      history('/login')
    }
  }, [])

  async function getProdutoById(){
    await getAll(`/produtos/${id}`, setProdutos, {
      headers:{
        Authorization: token
      }
    })
  }

  useEffect(()=>{
  getProdutoById()
  },[produtos])

  return ( 
  <> 
    {produtos.map(produto => (
      <Box m={2} >
      <Card variant="outlined">
          <img src={produto.foto} alt="" />
        <CardContent>
          <Typography variant="h5" component="h2">
            {produto.nome}
          </Typography>
          <Typography variant="body2" component="p">
            {produto.marca}
          </Typography>
          <Typography variant="body2" component="p">
            {produto.descricao}
          </Typography>
          <Typography variant="body2" component="p">
           {produto.preco}
          </Typography>
          <img src="" alt="" />
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="center" mb={1.5}>

            <Link to={""} className="text-decorator-none" >
              <Box mx={1}>
                <Button variant="contained" className="marginLeft" size='small' color="primary" >
                  atualizar
                </Button>
              </Box>
            </Link>
            <Link to={""} className="text-decorator-none">
              <Box mx={1}>
                <Button variant="contained" size='small' color="secondary">
                  deletar
                </Button>
              </Box>
            </Link>
          </Box>
        </CardActions>
      </Card>
    </Box>
    ))}  
  </>
  )
}

export default ListaProdutos