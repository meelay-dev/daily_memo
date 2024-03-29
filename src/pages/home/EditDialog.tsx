import * as Icon from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { Memo } from "../../models/memo";

const EditMemoDialog = ({
  open,
  setOpen,
  memo,
  onClickEdit,
}: {
  open: boolean;
  setOpen: () => void;
  memo: Memo;
  onClickEdit: (memo: Memo) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: memo.title,
      memo: memo.memo,
    },
  });

  useEffect(() => {
    setValue("title", memo.title);
    setValue("memo", memo.memo);
  }, [memo, setValue]);

  const handleEdit = async (formData: { title: string; memo: string }) => {
    onClickEdit({
      date: memo.date,
      title: formData.title,
      memo: formData.memo,
    });
  };

  return (
    <Dialog open={open} onClose={setOpen} fullWidth>
      <DialogTitle>
        {/* Title */}
        <Typography
          sx={{ fontSize: "2vw", fontWeight: "bold", textAlign: "center" }}
        >
          {t("edit_memo")}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ height: "1vh" }}></Box>

        {/* Title */}
        <Controller
          name="title"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              label={t("title")}
              size="small"
              fullWidth
              placeholder="Busy day"
              required
              error={errors.title !== undefined}
              helperText={
                errors.title && errors.title.type === "required"
                  ? "Required"
                  : ""
              }
            />
          )}
        ></Controller>
        <Box sx={{ height: "1vh" }}></Box>

        {/* Memo */}
        <Controller
          name="memo"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              label={t("memo")}
              multiline
              rows={20}
              maxRows={20}
              fullWidth
              placeholder="Let's go"
              required
              error={errors.memo !== undefined}
              helperText={
                errors.memo && errors.memo.type === "required" ? "Required" : ""
              }
            />
          )}
        ></Controller>
        <Box sx={{ height: "1vh" }}></Box>

        {/* Edit Btn */}
        <Button
          variant="contained"
          endIcon={<Icon.Edit />}
          onClick={handleSubmit(handleEdit)}
        >
          {t("edit")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(EditMemoDialog);
