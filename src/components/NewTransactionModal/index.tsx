import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './style';

import close from '../../assets/close.svg';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';

import { TransactionsContext } from '../../context/TransactionsContext';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose}: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');

  const { createTransaction } = useContext(TransactionsContext);

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      type,
      category,
    });

    setTitle('');
    setAmount(0);
    setType('deposit');
    setCategory('');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button"
        className="react-modal-close"
        onClick={onRequestClose}
      >
        <img src={close} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit'); }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
           <img src={income} alt="Entrada" />
           <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw'); }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
           <img src={outcome} alt="Saída" />
           <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}