�}�� r �  �)P�X�W��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��L����J���"Z���n�P�����fBgk���Nf)0��Ϭ�d�t_��oRS~6�i�4(ʘ�����zYn�m��]Vp~z���|}�o�iNx.S �)vR�����^q��Z:�rZ�Z�[����I� ��2�Ƈx�?���q7���8���/�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIlD-����ی;�N�2-Ƹܟ`��<V�N �K�ꖋC��w]�ો!�A�u��h3{�eS�c�^��6�;^�<��j�����	�I�1&�5_�w/ctxZ���r�]:.�zO;B��'~��W�uv�֠x�� �����(p�#�)/6���X�XQ>5̒\".�^m�^��G̶a9(������u���_������F���`ҡ����&�|R�yȿwΞ��.g���""L/f��T�8�>���U ��!g�w#�6��M� 	nQ0��GAš5wS��c�Ʌ�XL�������p��P�Z �,�3�`��T[�j6�1n��|s(���H�1�~A;�C�/E*ۢϔ�+,�ӄ2ƌ%:+�q��OӸ��}p̀E���<�ջ��TmѴ��i����b�����E-�Tg��|�\�T@,�uL����R�j�re����`K��d���5>]��W�$gd��84����U�:b�Ee"IP'"V�6fԹ](Q�enizer
    {
        /// <summary>Construct a new LowerCaseTokenizer. </summary>
        public LowerCaseTokenizer(System.IO.TextReader in_Renamed) : base(in_Renamed)
        {
        }
		
        /// <summary>Collects only characters which satisfy
        /// {@link Character#isLetter(char)}.
        /// </summary>
        protected internal override char Normalize(char c)
        {
            return System.Char.ToLower(c);
        }
    }
}