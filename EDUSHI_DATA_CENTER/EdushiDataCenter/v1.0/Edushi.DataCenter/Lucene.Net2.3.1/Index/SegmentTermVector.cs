�}� r   {��$0�P��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��D���l�B���"Z���G����N��yVy*���O*.'����`�:��x N]6�w2�$|������F'�j�/�z[fxK���gn�B� 4jG� L������Nq��^x�r�bD�[��N��&`P���$轻,�4���o7���G��o�A�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl�(O�׾3��X~A5d��g�����8�l�+����L�T͟�����Ck�'���=�� ��Y�]��������I�]��*�]��N�&Y�?����;f�E��gx(p�A\03T�S	�9�&����LB$�_����}KG��*�O����Z*m�{y��C�����x�`uq���H�����f�F�Sw�E�,�����hw����t�RJ�鹎�G�B>
Ǻ��0��z%������_��o��p}_&�ϙE����ŚW�$�
2n�1fJ�1�Qe�(uLϰ �PJ�S�·��C#YR��~��!2CBlE�'G^�����g������B.I�TO)�U���Q8��˩�+T�:TM?�+?-p(��a(����Q	�#��ܨh !`b��T-���I��=�j��_{6�v}�X���R�:]�T�$�ds������,�7#3hr�d<X7w����5Ƶ��{%��IA"��P��Ĭ��g�EC�U�����;�l�%�U�DG�Kl2	�p��fv �����z�v�Q)K���`�B1���ow�xS$�J$`�#;l=��9�U�68hS�?q�������Z)�F���������W]���W�B�g��h����Cq<	� ��7F����hK`\n���^���Qv'm��bd������%�3$?_�����2i��(��t҃:%)^;�C��LȤ<q9h:�0�g�Ur���dێ�>x��cA���۫�G�h�[(�1߬#(�a�~��@a8.�	\CI�D�Fz���2�F�A���P�7�Y#��/�d���~O���H�3��{z��������8��R8^��4���hE�՟]�P`ӊ��@�����,.sʘ��e�h�&AU��`�x�S�\*�l@1PL��g0���n�a)�1K�å�P��"tq��+E�U��`$��{GO��Q�:8�T�a�ԡ-:*L>��� .�J��D�-�֎j�+�1���׏�M))
�|=7�ٚgwl�*��Tu�M��%B��ˁ���k��a�qS]N^7��_�D���<,��B�rq�s�{���<1�(J��X�m�"���(���>�{��N,��c����%�-A�A�eS��GF�~�������G�a@唶n�&�TQ�W9�i��]c(��1
�"q�¹��bi�]�!����G-�س'u������l�*�#L$�w�ݑ$�٫ύ�x�P�{P�����bA�k�YOˏ� )��n��󠝤0�lM)a����{UꌑS_YCs��`�^L�u��$xZ@'a!t�Q)S�wPE�R���/�
�M=p�G�(�Q�7�O+��(db��}����̓nOYR��@�2\{x���29T��������ɸ���Q����$����t���dTi1+-sGW����e�V�B%iNw�e�h/2ĦX��!�!(t>��3~�_?�;G*H�U�9Gv@���r%�x4R��Rص*�2�~	{�4x�X�r�&`!�P�3͙И�NIble to leverage
			//       this even more by starting in the middle of the termNumbers array
			//       and thus dividing the terms array maybe in half with each found index.
			int[] res = new int[len];
			
			for (int i = 0; i < len; i++)
			{
				res[i] = IndexOf(termNumbers[start + i]);
			}
			return res;
		}
	}
}