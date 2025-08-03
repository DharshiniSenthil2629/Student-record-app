'use client';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

const users = [];

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const hashed = await bcrypt.hash(form.password, 10);
    users.push({ email: form.email, password: hashed });
    alert("Registered!");
    router.push('/auth/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Register</button>
    </form>
  );
}
