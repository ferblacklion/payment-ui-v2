import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Payment } from '../types';

export function TablePayments({ payments }: { payments?: Payment[] }) {
  return payments ? (
    <TableContainer mt="10">
      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>Pagados</Th>
          </Tr>
        </Thead>
        <Tbody data-testid="table-body">
          {payments.map((p) => {
            let date = null;
            try {
              date = format(new Date(p.datetime), 'PP');
            } catch {
              // do nothing
            }

            return (
              <Tr key={p.id}>
                <Td>{p.name}</Td>
                <Td style={{ textTransform: 'capitalize' }}>{p.person}</Td>
                <Td>{date ? date : null}</Td>
                <Td>
                  {p.image ? (
                    <Link
                      title="Image"
                      color="teal.500"
                      isExternal
                      href={p.image}
                    >
                      Imagen
                    </Link>
                  ) : (
                    'N/A'
                  )}{' '}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  ) : null;
}
