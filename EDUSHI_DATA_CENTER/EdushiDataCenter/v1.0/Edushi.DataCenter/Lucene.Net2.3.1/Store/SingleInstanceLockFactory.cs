�}e� r �  D�o'�b*��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��^����l�B���"Z�أa�L���@��l	ICg���O*	b��Р�/�uU��|Wt6�{D�(z[�ݕ��Μ3_c�y�)�ZQ5e@᱐vb�hh�fAw.j�g~R�����ri��Tv�lK�T�N��^[��GO�E��j�,�?��s1���@��I�k�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl.b%����f���Yv�Yn�L� �Y����F��TH������D~j������F�g��>%w�.��Mc>��Գ"d�0~,Z���I��!���}��-0\y�	3����@��-��p�(�n�
R;i砩G�L��m��q��	��"s�W��<��ղ��NX�O�[��5��%y��Y:��.���^��C��V�F�u5�)~
�B]��$K"*-&�t��pA�v�B~@����r<sY�'C|Fn�Q2�`ep�TNN����i��ꎷު�4kۇ^(����B�i�ÿ�^�4�_��/mz#�T1
�Lm4N�C`���0�	�
\��G��8]>�!�o�@S�w��(��;��M�	���^P�X���{ڤD��,�T�0b�c��k��j]a�����w8�"�P ��TStERG~� �� gD�~pr==f�ϘkG�B
G�� �L�ַ�a�q�io?�\��rvr�������i��	\߮ϲS|P�B��l�,na](i��Ϋ�)��|s�!�!|���"B_b.[��%�݁]9�b9)sR�Q�F65T���h��l3!Du��n$i�ND�l�{�;`�/�[J�Ћwh��:m�Y
�
&m~"��HK�a��9v3:	��fo�"�=8񚌹�����wg��<���\B�����ZE����x	WL��r�O\�I�=��nG rO2�ʹ��=騑!���^�;�L:�{#�I[T=�Bh$FCY���j����~����,&}������aa���!2��9��$��K"r�6YF���ѐ���}l#����eI�� �"V���d1{h?�)�����2������S�숟�һ9���P�c+*.�S!�ǽ�Z�/I��%e6t�oCg��}e��٤���4����N�����X��RŠp�!��
>s�!��=N�X����#D�n��	K�E�t��+�Vd����b=�@�֞q�/&4��ŧf�:�9�)��0������l�&^��F F����(��\ ���|1h�t�H��8��(ָ��k�z�E����]t�!)cD�া�Jq6��%1ޡ��F9��i�PL�|ޣ���A��'��_�m�P��$�f�=�M��;���[3��@gt6T���;�����3}BJ��[��(�xkd?*��hǑE2KgrC����U��'��A}��=��uN�It���O��/���[��f2	�q�Slq�
 X���4����#�?�v�=yk�V,µ��)�
EH\��<�8��M�����TI�ޡ�D^�zg�V�9?Q.nywΉ�XT"_�f��j�y��.T	D2`9C��n�#����q��c�g��4��Fڰm��w,R�PUOe
BBo��3.����P�<&>\��m��(<b��J���W�ɲ҃}��tݎ��Kx���
mD�C�d|ZhW���Wt��oG:.�~`��+Up,�?٨�֪,�^��� ������M<�s�8dG	�����>�rride void  Release()
		{
			lock (locks)
			{
				locks.Remove(lockName);
			}
		}
		
		public override bool IsLocked()
		{
			lock (locks)
			{
				return locks.Contains(lockName);
			}
		}
		
		public override System.String ToString()
		{
			return "SingleInstanceLock: " + lockName;
		}
	}
}