import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import {
  API_URL,
  API_URLS,
  DEFAULT_PAYMENTS,
  DEFAULT_PERSONS,
} from './constants';
import { Payment } from './types';
import { savePayment } from './services';
import { useToast } from '@chakra-ui/react';
import { TablePayments } from './components/table-payments';
import { cleanName } from './utils';

function App() {
  const [payment, setPayment] = useState('');
  const [person, setPerson] = useState('');
  const [file, setFile] = useState<File>();
  const [isSaved, setIsSaved] = useState(false);
  const toast = useToast();

  const { data: paymentData, mutate } = useSWR<Payment[]>(
    `${API_URL}/${API_URLS.PAYMENTS}`,
  );

  const clearData = () => {
    setPayment(() => '');
    setPerson(() => '');
    setIsSaved(() => false);
  };

  const onSave = async () => {
    if (!payment || !person) {
      toast({
        title: 'Error!',
        description: 'Los datos no estan completos!',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
      return;
    }
    setIsSaved(true);

    try {
      const data = {
        name: payment,
        person: person,
      };

      const paymentSaved = await savePayment(data, file);

      if (!paymentSaved) {
        toast({
          description: 'Error al enviar datos, intente luego!',
          status: 'error',
          duration: 9800,
          isClosable: true,
        });
        clearData();
        return;
      }

      const newData = paymentData || [];
      const time = new Date().getTime();
      const newItem: Payment = {
        ...data,
        id: time.toString(),
        datetime: time,
        image: null,
      };
      clearData();
      mutate([...newData, newItem]);
      toast({
        description: 'Guardado!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: 'Error al enviar datos, intente luego!',
        status: 'error',
        duration: 9800,
        isClosable: true,
      });
      console.log('savePayment: ', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <SimpleGrid columns={1} spacing={10}>
      <Box
        bg="aliceblue"
        padding="1.5"
        height="auto"
        bgGradient="linear(to-l, teal.400, green.500)"
        textAlign="center"
      >
        <Heading color="lightcyan" as="h1" size="xl">
          Gastos
        </Heading>
        <Card marginBottom="1">
          <CardBody>
            <RadioGroup onChange={setPayment} value={payment}>
              <Stack direction="column">
                {DEFAULT_PAYMENTS.map((p) => (
                  <Radio key={p} value={cleanName(p)}>
                    {p}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </CardBody>
        </Card>
        <Card marginBottom="1.5">
          <CardBody>
            <RadioGroup onChange={setPerson} value={person}>
              <Stack direction="column">
                {DEFAULT_PERSONS.map((p) => (
                  <Radio key={p} value={cleanName(p)}>
                    {p}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </CardBody>
        </Card>
        <FormControl m="20px 0">
          <FormLabel color="lightcyan">Foto Factura: (opcional)</FormLabel>
          <Input
            color="lightcyan"
            type="file"
            placeholder="factura"
            size="md"
            key={paymentData?.length || ''}
            onChange={handleFileChange}
            padding="1"
          />
        </FormControl>
        <Button
          isLoading={isSaved}
          onClick={onSave}
          width="full"
          colorScheme="blue"
          size="lg"
        >
          Guardar
        </Button>
        {paymentData?.length ? <TablePayments payments={paymentData} /> : null}
      </Box>
    </SimpleGrid>
  );
}

export default App;
