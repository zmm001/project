�}�� r I  �wi>=�b��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��(>B	?���g��p��%L��u����k�X���_1���������a:ok���c SpK٨���c�~��|P;�g�`	Î�� �МaOn�c�+�Lqvc\���|�ok�DdQa�leR���+���i!j��@3�o�h�Y��I��HT�_1 ��9���c�"���i"���#��=�k�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIlD-���E��;vvo�=��H��5+�������B ��fT^=�J��l{i��|�O)YNl�A��Qg�{��@3��<���]�٧ܥOE����0���7!E�r� �`�c��J��=7����R�~y������s�z-V�����X�E#}(����v�4�.ص�@*��}�e��L�õa9(���Fϫ�?�I�,�h��+���ǰӽ"�(����6�vO�1����Ȗ~|P�ľe	r{5��1�?�?���<��E-g�ZK�K��/�Z !5��GP��Nw\���.�ʆ�XF�~����u��s��4�}2C�P�]�<��LA�{<���*d��un:���R�b�gM,��#NTYrɱ��ڏ�GU���a��ph`�m׍MԳ�Op��V���+�����8Fb����i����~�냌�Rd�Xxϧ|�U� u6�{T����U�/�o1�����`K��d���5>]��W�$gd��84����U�:b�Ee"IP'"V�6fԹ](Q�ePosition's have exactly the same position.   
			int freq = 0;
			do 
			{
				// find position w/ all terms
				while (first.position < last.position)
				{
					// scan forward in first
					do 
					{
						if (!first.NextPosition())
						{
							return (float) freq;
						}
					}
					while (first.position < last.position);
					FirstToLast();
				}
				freq++; // all equal: a match
			}
			while (last.NextPosition());
			
			return (float) freq;
		}
	}
}