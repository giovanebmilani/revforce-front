interface EventCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }) => void;
}
