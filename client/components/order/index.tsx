'use client';

import { useForm } from 'react-hook-form';
import type { Cart } from '@/lib/nestjs-server/types';
import Price from '@/components/price';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export default function Order({ cart }: { cart: Cart | undefined | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const router = useRouter();
  const [, setCookie] = useCookies(['cartId']);

  if (!cart) {
    return <p>Cart is empty or cart items fetching error</p>;
  }

  const onSubmit = data => {
    console.log(data);
    setCookie('cartId', -1, {
      path: '/',
      sameSite: 'strict',
    });

    router.replace("/");
    router.refresh()

    alert("Order is processed!")
  }

  return (
    <div>
      <div className="container mx-auto my-12 px-8">
        <h1 className="text-2xl font-bold mb-4">Order checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="font-semibold mb-1">
                Email
              </label>
              <input
                {...register('email', { required: true})}
                type="email"
                id="email"
                className="p-2 border border-gray-300 rounded"
              />
              {errors.email?.type === 'required' && <p className="text-red-600" role="alert">Email is required</p>}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phoneNumber" className="font-semibold mb-1">
                Phone number
              </label>
              <input
                {...register('phoneNumber', { required: true})}
                type="tel"
                id="phoneNumber"
                className="p-2 border border-gray-300 rounded"
              />
              {errors.phoneNumber?.type === 'required' && <p className="text-red-600" role="alert">Phone number is required</p>}
            </div>
            <div className="flex mb-4">
              <div className="w-1/3 mr-2">
                <label htmlFor="firstName" className="font-semibold mb-1">
                  First name
                </label>
                <input
                  {...register('firstName', { required: true})}
                  type="text"
                  id="firstName"
                  className="p-2 border border-gray-300 rounded"
                />
                {errors.firstName?.type === 'required' && <p className="text-red-600" role="alert">First name is required</p>}
              </div>
              <div className="w-1/3 mr-2">
                <label htmlFor="lastName" className="font-semibold mb-1">
                  Last name
                </label>
                <input
                  {...register('lastName', { required: true})}
                  type="text"
                  id="lastName"
                  className="p-2 border border-gray-300 rounded"
                />
                {errors.lastName?.type === 'required' && <p className="text-red-600" role="alert">Last name is required</p>}
              </div>
              <div className="w-1/3">
                <label htmlFor="Patronymic" className="font-semibold mb-1">
                  Patronymic
                </label>
                <input
                  {...register('patronymic', { required: true})}
                  type="text"
                  id="patronymic"
                  className="p-2 border border-gray-300 rounded"
                />
                {errors.patronymic?.type === 'required' && <p className="text-red-600" role="alert">Patronymic is required</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="flex flex-col mr-2">
                <label htmlFor="address" className="font-semibold mb-1">
                  Shipping address
                </label>
                <input
                  {...register('address', { required: true})}
                  type="text"
                  id="address"
                  className="p-2 border border-gray-300 rounded"
                />
                {errors.address?.type === 'required' && <p className="text-red-600" role="alert">Address is required</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="zipCode" className="font-semibold mb-1">
                  Zip code
                </label>
                <input
                  {...register('zipCode', { required: true})}
                  type="text"
                  id="zipCode"
                  className="p-2 border border-gray-300 rounded"
                />
                {errors.zipCode?.type === 'required' && <p className="text-red-600" role="alert">Zip code is required</p>}
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center bg-black p-3 text-sm font-medium uppercase text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black"
            >
              Checkout
            </button>
          </form>
          <div className="border-l pl-4">
            <h2 className="text-xl font-bold mb-2">Cart</h2>
            {cart.lines.length !== 0 ? (
              <div className="flex h-full flex-col justify-between overflow-hidden">
                <ul className="flex-grow overflow-auto p-6">
                  {cart.lines.map((item, i) => (
                    <li key={i} data-testid="cart-item" className="flex items-center mb-4">
                      <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white">
                        <Image
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                          alt={item.product.featuredImage.altText || item.product.title}
                          src={'http://localhost:4200/' + item.product.featuredImage.fileName}
                        />
                      </div>
                      <div className="flex flex-1 flex-col text-base ml-4">
                        <span className="font-semibold mb-1">{item.product.title}</span>
                        {item.characteristic && item.characteristic.title && (
                          <p className="text-sm mb-1" data-testid="cart-product-variant">
                            {item.characteristic.title}
                          </p>
                        )}
                        <p className="text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <Price
                        className="flex flex-col justify-between space-y-2 text-sm"
                        amount={item.totalAmount.amount}
                        currencyCode={item.totalAmount.currencyCode}
                      />
                    </li>
                  ))}
                  <hr className="my-4" />
                  <div className="flex justify-between pb-8">
                    <span className="font-bold">Total count:</span>
                    <p>{cart.totalQuantity}</p>
                  </div>
                  <div className="flex justify-between mb-8 pb-8">
                    <span className="font-bold">Total:</span>
                    <Price
                      className="text-right"
                      amount={cart.totalAmount.amount}
                      currencyCode={cart.totalAmount.currencyCode}
                    />
                  </div>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
