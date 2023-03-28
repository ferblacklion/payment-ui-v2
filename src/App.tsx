import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import toDate from 'date-fns/toDate';
import format from 'date-fns/format';
import { API_URL, DEFAULT_PAYMENTS, DEFAULT_PERSONS } from './constants';
import { Payment } from './types';
import { saveImage, savePayment, updatePayment } from './services';

function cleanName(value: string) {
  return value.toLowerCase().replace(' ', '-');
}

function App() {
  const [payment, setPayment] = useState('');
  const [person, setPerson] = useState('');
  const [file, setFile] = useState<File>();
  const [isSaved, setIsSaved] = useState(false);

  const { data: paymentData, mutate } = useSWR<Payment[]>(`${API_URL}/payment`);

  const clearData = () => {
    setPayment(() => '');
    setPerson(() => '');
    setIsSaved(() => false);
  };

  const onSave = async () => {
    if (!payment || !person) return;
    setIsSaved(true);

    try {
      let image = null;
      if (file) {
        const imageResponse = await saveImage(file);
        image = imageResponse?.image_url || null;
      }

      const data = {
        name: payment,
        person: person,
      };

      const paymentSaved = await savePayment(data);

      if (image && paymentSaved?.id) {
        await updatePayment(paymentSaved.id, image);
      }

      const newData = paymentData || [];
      const time = new Date().getTime();
      const newItem: Payment = {
        ...data,
        id: time.toString(),
        datetime: time,
        image,
      };
      clearData();
      mutate([...newData, newItem]);
    } catch (error) {
      alert('Error al enviar datos, intente luego');
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
          Nuevo Gasto
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
        {paymentData ? (
          <TableContainer mt="10">
            <Table variant="striped" colorScheme="teal" size="sm">
              <Thead>
                <Tr>
                  <Th>Pagados</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paymentData.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.name}</Td>
                    <Td style={{ textTransform: 'capitalize' }}>{p.person}</Td>
                    <Td>{format(toDate(p.datetime), 'MM/dd/yy')}</Td>
                    <Td>
                      {p.image ? (
                        <Link color="teal.500" isExternal href={p.image}>
                          Link
                        </Link>
                      ) : (
                        'N/A'
                      )}{' '}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : null}
      </Box>
    </SimpleGrid>
  );
}

export default App;
