import { Modal, useMantineTheme } from '@mantine/core';
import AdminPanel from './AdminPanel';

function ShareModal({ adminModalOpened, setAdminModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      centered
      size="42.5%"
      opened={adminModalOpened}
      padding="md"
      onClose={() => setAdminModalOpened(false)}
    >
      <AdminPanel />
    </Modal>
  );
}

export default ShareModal;
