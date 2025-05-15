import React, { useEffect, useState } from "react";

type Props = {};

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username: string;
  email: string;
  password: string;
}

function Example2({}: Props) {
  const deger = false;

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const newErrors: FormErrors = {
        username: "",
        email: "",
        password: "",
      };

      if (formData.username.length < 3) {
        newErrors.username = "Kullanıcı adı en az 3 karekter olmalıdır";
      }

      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Lütfen geçerli bir email adresi giriniz!";
      }

      if (formData.password.length < 6) {
        newErrors.password = "Şifreniz en az 6 karekter olmalıdır";
      }
      setErrors(newErrors);

      setIsFormValid(!Object.values(newErrors).some((error) => error !== ""));
    };

    if (
      formData.email.length > 0 ||
      formData.password.length > 0 ||
      formData.username.length > 0
    ) {
      validateForm();
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <div>{errors.username && errors.username}</div>
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <div>{errors.email && errors.email}</div>
        <input
          type="text"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <div>{errors.password && errors.password}</div>

        <button disabled={!isFormValid}>Kaydet</button>
      </form>
    </div>
  );
}

export default Example2;
